import { useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  function startGame() {
    setGameStarted(true);
  }

  function endGame() {
    setGameEnded(true);
  }

  return (
    <>
      <Header gameStarted={gameStarted} gameEnded={gameEnded} />
      <Main gameStarted={gameStarted} gameEnded={gameEnded}
        startGame={startGame} endGame={endGame} />
    </>
  );
}

export default App;
