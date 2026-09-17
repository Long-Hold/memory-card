export function GameOver({hasWon, restartGame}) {
  return (
    <section className="game-over-screen">
      <p className="game-over-text">{hasWon ? 'Round Won!' : 'Out of Turns!'}</p>
      <button type="button" onClick={restartGame}>New Game</button>
    </section>
  )
}