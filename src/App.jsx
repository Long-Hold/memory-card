import './reset.css';
import { useState } from 'react'
import { DIFFICULTIES } from './constants/difficulties';
import { GamePage } from './components/game/GamePage'
import { Sidebar } from './components/sidebar/Sidebar'
import { Footer } from './components/footer/Footer';
import './App.css';

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
      <Footer />
    </>
  )
}

export default App
