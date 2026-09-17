import { useState } from "react";
import { fetchStandardCardImages } from "./util/fetchCardImages";
import { fetchDeck } from "../../util/fetchDeck";
import { Card } from "./components/Card";
import { GameState } from "./components/GameState";
import { cardsMatch } from "./util/cardsMatch";

const playingCardsApi = "https://deckofcardsapi.com/api/deck/new//?deck_count=1";

export function GamePage() {
  const [deck, setDeck] = useState(null);
  const [cardImgs, setImgs] = useState(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({winStreak: 0, remainingTurns: 15});
  const [previousCard, setPreviousCard] = useState(null);

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
      })
      setImgs([...cleanedCards]);
      setLoading(false);
    }
  }

  const handleCardClick = (clickedCard) => {
    if (!previousCard) {
      setPreviousCard(clickedCard);
      return;
    }

    if (clickedCard.id === previousCard.id) return;

    if (cardsMatch(previousCard, clickedCard)) {
      console.log('Match!');
      setPreviousCard(null);
      return;
    } else {
      console.log('Not a match!');
      setPreviousCard(null);
      setStats(prev => ({...prev, remainingTurns: prev.remainingTurns - 1}));
      return;
    }
  }

  if (loading)
    return (
      <div>
        <button
          type="button"
          onClick={() => initializeCards(playingCardsApi)}
        >
          Load Standard Cards
        </button>

        <p>Loading deck...</p>
      </div>
  )

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
      <ul>
        {cardImgs.map((card, index) =>
          <li key={card.code}> 
            <Card 
              cardId={card.code}
              index={index}
              imageSrc={card.image}
              suit={card.suit}
              value={card.value}
              recordClick={() => 
                handleCardClick({id: card.code, suit: card.suit, value: card.value})
              }
            />
          </li>
        )}
      </ul>
    </div>
  )
}