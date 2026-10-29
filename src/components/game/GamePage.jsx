import { useState } from "react";
import { fetchStandardCardImages } from "./util/fetchCardImages";
import { fetchDeck } from "../../util/fetchDeck";
import { Card } from "./components/Card";
import { GameState } from "./components/GameState";
import { cardsMatch } from "./util/cardsMatch";
import { GameOver } from "./components/GameOver";
import { shuffleArray } from "./util/shuffleArray";
import { StartScreen } from "./components/StartScreen";
import { ErrorScreen } from "./components/ErrorScreen";

import "./styles/gamePage.css";

const playingCardsApi = "https://deckofcardsapi.com/api/deck/new/?deck_count=1";

export function GamePage({difficulty}) {
  const [cardImgs, setImgs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [gameError, setError] = useState(null);

  const [stats, setStats] = useState({winStreak: 0, remainingTurns: difficulty});

  const [currentPair, setCurrentPair] = useState([]);

  // Tracks matched cards that have been removed from the board
  const [matchedCardIds, setMatchedCardIds] = useState(new Set());

  // Fetches cards from API and causes a re-render to display them
  const initializeCards = async (cardStyle) => {
    setError(null);

    try {
      const deck = await fetchDeck(cardStyle);
      const { cards } = await fetchStandardCardImages(deck.deck_id);

      const cleanedCards = cards.map(({ images, ...rest }) => ({
        ...rest,
        image: images.png,
      }));

      setImgs(shuffleArray(cleanedCards));

      await Promise.all(
        cleanedCards.map(({ image }) => {
          const img = new Image();
          img.src = image;
          return img.decode().catch(() => {});
        })
      );

      setLoading(false);
    } catch (error) {
      setError(error.message || "Failed to load cards.");
    }
  };

  const handleCardClick = (clickedCard) => {
    // A full pair means a new turn is starting, so the clicked card becomes the first pick.
    if (currentPair.length === 2) {
      setCurrentPair([clickedCard]);
      return;
    }

    if (currentPair.length === 1) {
      const [firstCard] = currentPair;

      // Clicking the same card twice must not count as a guess.
      if (firstCard.id === clickedCard.id) return;

      if (cardsMatch(firstCard, clickedCard)) {
        setMatchedCardIds(prev => new Set(prev).add(firstCard.id).add(clickedCard.id));
      } else {
        setStats(prev => ({ ...prev, remainingTurns: prev.remainingTurns - 1 }));
      }
    }

    setCurrentPair(prev => [...prev, clickedCard]);
  };

  const restartGame = () => {
    setImgs(prev => [...shuffleArray(prev)]);
    setStats(prev => ({
      ...prev,
      winStreak: prev.remainingTurns <= 0 ? 0 : prev.winStreak + 1,
      remainingTurns: difficulty,
    }));

    setMatchedCardIds(new Set());
    setCurrentPair([]);
  }

  if (gameError) {
    return (
      <ErrorScreen
        message={gameError}
        retry={() => initializeCards(playingCardsApi)}
      />
    );
  }

  if (loading) {
    return (
      <StartScreen loadCards={() => initializeCards(playingCardsApi)}/>
    )
  }

  // cardImg's relies on an async API call, so it could read 0 at this point which would cause
  // an instance win.
  const hasWon = (cardImgs.length > 0 && matchedCardIds.size === cardImgs?.length);
  const isOutOfTurns = stats.remainingTurns <= 0;
  if (hasWon || isOutOfTurns) {
    return (
      <GameOver
        hasWon={hasWon}
        restartGame={restartGame}
      />
    )
  }

  return (
    <div className="game-area">
      <GameState 
        winStreak={stats.winStreak}
        remainingGuesses={stats.remainingTurns}
      />
      <ul className="cards-area" aria-label="Memory card grid">
        {cardImgs.map((card, index) => {
          const isMatched = matchedCardIds.has(card.code);
          const isFlipped = currentPair.some(guessedCard => guessedCard.id === card.code);
          const notAMatch = (isFlipped && !isMatched && currentPair.length === 2);
          return (
            <li key={card.code}> 
              <Card 
                cardId={card.code}
                index={index}
                imageSrc={card.image}
                suit={card.suit}
                value={card.value}
                isFlipped={isFlipped}
                isMatched={isMatched}
                isNotAMatch={notAMatch}
                recordClick={() => 
                  handleCardClick({id: card.code, suit: card.suit, value: card.value})
                }
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}