import './reset.css';
import { useState } from 'react'
import { GamePage } from './components/game/GamePage'
import { Sidebar } from './components/sidebar/Sidebar'
import './App.css'
import { DIFFICULTIES } from './constants/difficulties';

function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.standard);

  return (
    <>
      <header className='website-header'>
        <h1>Concentration</h1>
      </header>
      <Sidebar
        currentDifficulty={difficulty} 
        setDifficulty={setDifficulty}
      />
      <main>
        <GamePage 
          key={difficulty} // triggers a render if the user changes difficulty
          difficulty={difficulty}
        />
      </main>
      <footer>
        <p>
          <small>
            Designed and developed by Matthew Harview.
            Standard playing card images retrieved from <a href='https://deckofcardsapi.com/'>Deck of Cards API</a>.
          </small>
        </p>

        <nav className='personal-links' aria-labelledby='personal-links-heading'>
          <h2 id='personal-links-heading'>Personal Links</h2>
          <ul className='personal-links-list'>
            <li>
              <a href='https://github.com/Long-Hold'>
                <img className='link-icon' src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/github/github-original.svg" alt='' width={40} height={40}/>
                GitHub Profile
              </a>
            </li>
            <li>
              <a href='https://github.com/Long-Hold/memory-card'>
                <img className='link-icon' src="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/git/git-original.svg" alt='' width={40} height={40}/>
                Source Code
              </a>
            </li>
          </ul>
        </nav>
      </footer>
    </>
  )
}

export default App
