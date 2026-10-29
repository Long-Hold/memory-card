import "../styles/card.css";

const cardBackImg = "https://deckofcardsapi.com/static/img/back.png";

export function Card({
  index,
  imageSrc,
  suit,
  value,
  isFlipped,
  isMatched,
  isNotAMatch,
  recordClick,
}) {
  return (
    <button
      className={`card${isFlipped ? " flipped" : ""}${isNotAMatch ? " mismatch" : ""}`}
      type="button"
      disabled={isMatched}
      aria-label={isFlipped ? `${value} of ${suit}` : `Card #${index + 1}`}
      onClick={recordClick}
    >
      <span className="card-inner">
        <img className="card-face card-back" src={cardBackImg} alt="" />
        <img
          className="card-face card-front"
          src={imageSrc}
          alt=""
          decoding="async"
        />
      </span>
    </button>
  );
}
