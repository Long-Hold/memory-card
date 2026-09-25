export function StartScreen({loadCards}) {
  return (
    <section className="start-screen">
      <h2>Concentration</h2>

      <button
        type="button"
        onClick={loadCards}
      >
        Start Game
      </button>
    </section>
  )
}