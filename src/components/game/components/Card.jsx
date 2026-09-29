import "../styles/card.css";

export function Card({cardId, index, imageSrc, suit, value, isFlipped, isMatched, isNotAMatch, recordClick}) {
  return (
    <button
      className={`card${isFlipped ? " flipped" : " notFlipped"}${isNotAMatch ? " mismatch" : ""}`}
      type="button"
      data-id={cardId}
      data-suit={suit}
      data-value={value}
      disabled={isMatched}
      aria-label={isFlipped ? `Card #${index + 1}` : `${value} of ${suit}`}
      onClick={recordClick}
    >
      <img src={imageSrc} alt=""></img>
    </button>
  )
}