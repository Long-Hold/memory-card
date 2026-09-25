import './reset.css';
import { useState } from 'react'
import { GamePage } from './components/game/GamePage'
import { Sidebar } from './components/sidebar/Sidebar'
import './App.css'

const DIFFICULTIES = {
  standard: 30,
  moderate: 15,
  extreme: 5,
}

function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.standard);

  return (
    <>
      <Sidebar
        defaultGuesses={difficulty} 
        setStandardDiff={() => setDifficulty(DIFFICULTIES.standard)}
        setModerateDiff={() => setDifficulty(DIFFICULTIES.moderate)}
        setExtremeDiff={() => setDifficulty(DIFFICULTIES.extreme)}
      />
      <main>
        <GamePage 
          key={difficulty} // triggers a render if the user changes difficulty
          difficulty={difficulty}
        />
      </main>
    </>
  )
}

export default App
