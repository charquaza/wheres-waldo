import Header from "./components/Header";
import Main from "./components/Main";
import { useState } from "react";
import './App.css';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function startGame() {
    setGameStarted(true);
  }

  return (
    <>
      <Header gameStarted={gameStarted} />
      <Main gameStarted={gameStarted} startGame={startGame} />
    </>
  );
}

export default App;
