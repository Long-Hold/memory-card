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
        <fieldset className="difficulty-group">
          <legend>Number of Guesses</legend>
          {Object.entries(DIFFICULTIES).map(([name, guesses]) => (
            <div key={name} className="difficulty-button">
              <label htmlFor={name}>{name} [{guesses} Guesses]</label>
              <input 
                id={name} 
                type="radio"
                name="difficulty"
                checked={currentDifficulty === guesses}
                onChange={() => setDifficulty(guesses)} />
            </div>
          ))}
        </fieldset>
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
    >
      <span className="active-indicator" aria-hidden="true">◯ </span>
      {difficultyToSet} Guesses
    </button>
  )
}