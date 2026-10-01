import { useState, useId } from "react"
import { DIFFICULTIES } from "../../constants/difficulties"
import "../sidebar/sidebar.css";

export function Sidebar({currentDifficulty, setDifficulty}) {
  const [isOpen, setIsOpen] = useState(true);
  const panelId = useId();
  
  return (
    <aside className="sidebar" aria-label="Game settings">
      <button
        type="button"
        className="sidebar-toggle"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Settings
      </button>
      <div id={panelId} className="sidebar-panel" inert={!isOpen}>
        <section className="game-rules">
          <details>
            <summary>Game Rules</summary>
            <ol>
              <li>Pick any two cards. Once a card is selected, you cannot change it.</li>
              <li>If the cards have the same <b>Color</b> and <b>Rank</b>, they will be removed from the board.</li>
              <li>If the <b>Color</b> and / or <b>Rank</b> do not match, the cards flip back over and your <b>Remaining Guesses</b> go down.</li>
              <li>Once all cards are removed, or if you run out of guesses, the round will end.</li>
            </ol>
          </details>
        </section>

        <section className="difficulty-selector">
          <h3>Choose your difficulty:</h3>
          <p>Current Choice: {currentDifficulty} Guesses</p>
          <ul>
            {Object.values(DIFFICULTIES).map((guesses) => (
              <li key={guesses}>
                <DifficultyButton 
                  onClick={() => setDifficulty(guesses)}
                  currentDifficulty={currentDifficulty}
                  difficultyToSet={guesses}
                />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  )
}

function DifficultyButton({onClick, currentDifficulty, difficultyToSet}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={currentDifficulty === difficultyToSet}
      className="difficulty-button"
    >{difficultyToSet} Guesses</button>
  )
}