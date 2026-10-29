import "../styles/gameState.css";

export function GameState({ winStreak, remainingGuesses }) {
  return (
    <section className="game-status" aria-labelledby="game-status-heading">
      <h2 id="game-status-heading" className="visually-hidden">
        Game Status
      </h2>
      <div className="status-metrics" aria-live="polite">
        <p className="metric">
          Win Streak <span className="value">{winStreak}</span>
        </p>
        <p className="metric">
          Remaining Guesses <span className="value">{remainingGuesses}</span>
        </p>
      </div>
    </section>
  );
}
