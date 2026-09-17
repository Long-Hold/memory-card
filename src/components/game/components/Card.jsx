export function Card({cardId, index, imageSrc, suit, value, isFlipped, recordClick}) {
  return (
    <button
      className={`card${isFlipped ? " flipped" : ""}`}
      type="button"
      data-id={cardId}
      data-suit={suit}
      data-value={value}
      aria-label={isFlipped ? `Card #${index + 1}` : `${value} of ${suit}`}
      onClick={recordClick}
    >
      <img src={imageSrc} alt=""></img>
    </button>
  )
}