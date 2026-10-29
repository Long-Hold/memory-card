import { useEffect, useRef } from "react";

export function GameOver({ hasWon, restartGame }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <section className="game-over-screen" aria-labelledby="game-over-heading">
      <h2 id="game-over-heading" className="game-over-text" role="alert">
        {hasWon ? "Round Won!" : "Out of Turns!"}
      </h2>
      <button
        className="game-control-btn start-game-button"
        ref={buttonRef}
        type="button"
        onClick={restartGame}
      >
        New Game
      </button>
    </section>
  );
}
