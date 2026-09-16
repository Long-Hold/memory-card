import { useState } from "react";

export function Card({cardId, index, imageSrc, suit, value, recordClick}) {
  const [isFlipped, setFlippedState] = useState(false);

  const handleClick = () => {
    // Prevents clicking an already flipped card
    // if (isFlipped) return;

    setFlippedState(true);
    recordClick(cardId, suit, value);
  }

  return (
    <button
      className={`card${isFlipped ? " flipped" : ""}`}
      type="button"
      data-id={cardId}
      data-suit={suit}
      data-value={value}
      aria-label={isFlipped ? `Card #${index + 1}` : `${value} of ${suit}`}
      onClick={handleClick}
    >
      <img src={imageSrc} alt=""></img>
    </button>
  )
}