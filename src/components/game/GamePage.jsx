import { useState, useEffect } from "react";
import { fetchCardImages } from "./util/fetchCardImages";
import { fetchDeck } from "../../util/fetchDeck";

const playingCardsApi = "https://deckofcardsapi.com/api/deck/new//?deck_count=1";

export function GamePage() {
  const [deck, setDeck] = useState(null);
  const [cardImgs, setImgs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await fetchDeck(playingCardsApi)
      const images = await fetchCardImages(cards.deck_id);
      setImgs(images);

      if (cards && images) {
        setDeck(cards);
        setImgs(images);
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  if (loading)
    return <p>Loading deck...</p>

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