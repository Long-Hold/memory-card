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

  const [winSteak, setWinStreak] = useState(0);
  const [remainingTurns, setRemainingTurns] = useState(15);
  const [previousCard, setPreviousCard] = useState({id: null, suit: null, value: null});

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

  const handleCardClick = (cardId, cardSuit, cardValue) => {
    const currentCard = {id: cardId, suit: cardSuit, value: cardValue};

    if (previousCard.id === null) {
      setPreviousCard(currentCard);
      return;
    }

    if (cardId === previousCard.id)
      return;

    if (cardsMatch(previousCard, currentCard)) {
      console.log('Match!');
      setPreviousCard({id: null, suit: null, value: null});
      return;
    } else {
      console.log('Not a match!');
      setPreviousCard({id: null, suit: null, value: null})
      setRemainingTurns(prev => prev - 1);
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
          winStreak={winSteak}
          remainingGuesses={remainingTurns}
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
              recordClick={handleCardClick}
            />
          </li>
        )}
      </ul>
    </div>
  )
}