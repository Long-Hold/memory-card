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
    console.log(images);

    if (cards && images) {
      setDeck(cards);
      setImgs(images);
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
      <p>Deck: {deck?.deck_id}</p>
      <p>Cards: {deck?.remaining}</p>

      {cardImgs.cards.map(card => 
        <img key={card.code} src={card.image}></img>
      )}
    </div>
  )
}