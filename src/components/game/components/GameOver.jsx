export function GameOver({hasWon, restartGame}) {
  return (
    <section className="game-over-screen">
      <h2 className="game-over-text">{hasWon ? 'Round Won!' : 'Out of Turns!'}</h2>
      <button type="button" onClick={restartGame}>New Game</button>
    </section>
  )
}