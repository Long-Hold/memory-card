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
        aria-label="Settings"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        { isOpen ? <BackBurgerIcon /> : <ForwardBurgerIcon />}
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

function ForwardBurgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z" />
    </svg>
  );
}

function BackBurgerIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z" />
    </svg>
  );
}