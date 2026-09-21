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
        setStandardDiff={() => setDifficulty(DIFFICULTIES.standard)}
        setModerateDiff={() => setDifficulty(DIFFICULTIES.moderate)}
        setExtremeDiff={() => setDifficulty(DIFFICULTIES.extreme)}
      />
      <GamePage 
        key={difficulty} // triggers a render if the user changes difficulty
        difficulty={difficulty}
      />
    </>
  )
}

export default App
