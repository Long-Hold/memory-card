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
    </>
  )
}

export default App
