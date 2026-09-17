export function GameOver({wonGame, restartGame}) {
  return (
    <section className="game-over-screen">
      <p className="game-over-text">{wonGame ? 'Round Won!' : 'Out of Turns!'}</p>
      <button type="button" onClick={restartGame}>New Game</button>
    </section>
  )
}