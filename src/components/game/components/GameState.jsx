export function GameState({winStreak, remainingGuesses}) {
  return (
    <header className="game-header">
      <h2>Game Status</h2>
      <div className="status-metrics" aria-live="polite">
        <p className="metric">Win Streak: <span className="value">{winStreak}</span></p>
        <p className="metric">Remaining Guesses: <span className="value">{remainingGuesses}</span></p>
      </div>
    </header>
  )
}