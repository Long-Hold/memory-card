import './reset.css';
import { useState } from 'react'
import { DIFFICULTIES } from './constants/difficulties';
import { GamePage } from './components/game/GamePage'
import { Sidebar } from './components/sidebar/Sidebar'
import { Footer } from './components/footer/Footer';
import { MainHeader } from './components/mainHeader/MainHeader';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState(DIFFICULTIES.standard);

  return (
    <>
      <Sidebar
        currentDifficulty={difficulty} 
        setDifficulty={setDifficulty}
      />
      <main>
        <MainHeader />
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
