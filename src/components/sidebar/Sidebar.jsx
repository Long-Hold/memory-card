export function Sidebar({setStandardDiff, setModerateDiff, setExtremeDiff}) {
  return (
    <aside className="sidebar">
      <section className="game-rules">
        <details>
          <summary>Game Rules</summary>
          <ol>
            <li>Pick any two cards. Once a card is selected, you cannot change it.</li>
            <li>If the cards have the same <b>Color</b> and <b>Rank</b>, they will be removed from the board.</li>
            <li>If the <b>Color</b> and / or <b>Rank</b> do not match, the cards flip back over.</li>
            <li>Once all cards are removed, or if you run out of guesses, the round will end.</li>
          </ol>
        </details>
      </section>

      <section className="difficulty-selector">
        <h3>Choose your difficulty:</h3>
        <p>Default: Unlimited Guesses</p>
        <ul>
          <li>
            <button type="button" className="difficulty-button" onClick={setStandardDiff}>30 Guesses</button>
          </li>
          <li>
            <button type="button" className="difficulty-button" onClick={setModerateDiff}>15 Guesses</button>
          </li>
          <li>
            <button type="button" className="difficulty-button" onClick={setExtremeDiff}>5 Guesses</button>
          </li>
        </ul>
      </section>
    </aside>
  )
}