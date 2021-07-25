import StartScreen from "./components/StartScreen";
import Header from "./components/Header";
import Image from "./components/Image";
import { useState } from "react";
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function startGame() {
    setGameStarted(true);
  }

  return (
    <>
      <Header />
      <main>
        {gameStarted
          ? <Image />
          : <StartScreen startGame={startGame} />
        }
      </main>
    </>
  );
}

export default App;
