import { useState } from "react";
import { fetchStandardCardImages } from "./util/fetchCardImages";
import { fetchDeck } from "../../util/fetchDeck";

const playingCardsApi = "https://deckofcardsapi.com/api/deck/new//?deck_count=1";

export function GamePage() {
  const [deck, setDeck] = useState(null);
  const [cardImgs, setImgs] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleCardSelection = async (cardStyle) => {
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

  if (loading)
    return (
      <div>
        <button
          type="button"
          onClick={() => handleCardSelection(playingCardsApi)}
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
      {cardImgs.map(card => 
        <img 
          key={card.code} 
          src={card.image}
        ></img>
      )}
    </div>
  )
}