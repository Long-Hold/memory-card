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
        <h2>Choose your difficulty:</h2>
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