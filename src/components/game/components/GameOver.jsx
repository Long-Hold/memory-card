import { useEffect, useRef } from "react";

export function GameOver({hasWon, restartGame}) {
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <section className="game-over-screen">
      <h2 className="game-over-text">{hasWon ? 'Round Won!' : 'Out of Turns!'}</h2>
      <button ref={buttonRef} type="button" onClick={restartGame}>New Game</button>
    </section>
  )
}