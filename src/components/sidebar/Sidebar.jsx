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
          <legend>Difficulty</legend>
          {Object.entries(DIFFICULTIES).map(([name, guesses]) => (
            <div key={name} className="difficulty-option">
              <input 
                id={name} 
                type="radio"
                name="difficulty"
                className="difficulty"
                checked={currentDifficulty === guesses}
                onChange={() => setDifficulty(guesses)} 
              />
              <label 
                htmlFor={name} 
                className="difficulty-label">
                  <span className="label-span difficulty-name">{name}</span> 
                  <span className="label-span difficulty-guesses">{guesses} Guesses</span>
              </label>
            </div>
          ))}
        </fieldset>
      </div>
    </aside>
  )
}
