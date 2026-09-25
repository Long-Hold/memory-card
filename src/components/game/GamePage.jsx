import { useState } from "react";
import { fetchStandardCardImages } from "./util/fetchCardImages";
import { fetchDeck } from "../../util/fetchDeck";
import { Card } from "./components/Card";
import { GameState } from "./components/GameState";
import { cardsMatch } from "./util/cardsMatch";
import { GameOver } from "./components/GameOver";
import "./styles/gamePage.css";
import { shuffleArray } from "./util/shuffleArray";
import { useMemo } from "react";
import { useEffect } from "react";
import { StartScreen } from "./components/StartScreen";

const playingCardsApi = "https://deckofcardsapi.com/api/deck/new//?deck_count=1";
const cardBackImg = "https://deckofcardsapi.com/static/img/back.png";

export function GamePage({difficulty}) {
  const [deck, setDeck] = useState(null);
  const [cardImgs, setImgs] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({winStreak: 0, remainingTurns: difficulty});

  const [currentPair, setCurrentPair] = useState([]);

  // Tracks matched cards that have been removed from the board
  const [matchedCardIds, setMatchedCardIds] = useState(new Set());

  // Fetches cards from API and causes a re-render to display them
  const initializeCards = async (cardStyle) => {
    const cards = await fetchDeck(cardStyle);
    const images = await fetchStandardCardImages(cards.deck_id);

    if (cards && images) {
      setDeck({
        id: cards.deck_id,
        remaining: cards.remaining,
      });

      // Makes the array flat
      const cleanedCards = images.cards.map((card) => {
        const {images, ...rest} = card;
        return {
          ...rest,
          image: images.png,
        }
      });

      const shuffledCards = shuffleArray(cleanedCards);
      setImgs([...shuffledCards]);
      setLoading(false);
    }
  }

  const handleCardClick = (clickedCard) => {
    // Prevents 'won' cards being played at all
    if (matchedCardIds.has(clickedCard.id)) return;

    if (currentPair.some(card => card.id === clickedCard.id)) return;

    /**
     * If the currentPair array has two cards and this function has been called,
     * it means the user is beginning their selection of a new pair of cards during this call,
     * so we discard the previous two cards and record the clickedCard of the new pair selection.
     */
    if (currentPair.length === 2) {
      setCurrentPair([clickedCard]);
      return;
    }

    /**
     * If the currentPair array already has 1 card in it, then we can immediately compare the clickedCard
     * against the currentPair card to see if they are a match or not.
     */
    if (currentPair.length === 1) {
      const firstCard = currentPair[0];
      if (cardsMatch(firstCard, clickedCard)) {
        console.log("Match!");

        setMatchedCardIds(prev => {
          const next = new Set(prev);
          next.add(firstCard.id).add(clickedCard.id);
          return next;
        });
      }

      else {
        console.log("Not match!");
        setStats(prev => ({ ...prev, remainingTurns: prev.remainingTurns - 1 }));
      }
    }

    /**
     * Even if the two cards were compared in the conditional above, a new turn for 
     * two new cards has not yet begin so these cards can be considered the
     * "currently selected pair".
     */
    setCurrentPair(prev => [...prev, clickedCard]);
  }

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
    <div>
      <h1>Cards</h1>
      <p>Deck: {deck?.id}</p>
      <p>Cards: {deck?.remaining}</p>
      <div>
        <GameState 
          winStreak={stats.winStreak}
          remainingGuesses={stats.remainingTurns}
        />
      </div>
      <ul className="cards-area">
        {cardImgs.map((card, index) => {
          const isFlipped = matchedCardIds.has(card.code) || currentPair.some(guessedCard => guessedCard.id === card.code);

          return (
            <li key={card.code}> 
              <Card 
                cardId={card.code}
                index={index}
                imageSrc={isFlipped ? card.image : cardBackImg}
                suit={card.suit}
                value={card.value}
                isFlipped={isFlipped}
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