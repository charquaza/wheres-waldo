import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";

function Main(props) {
    return (
        <main>
            {(props.gameEnded)
                ? <EndScreen />
                : (props.gameStarted)
                ? <GameScreen endGame={props.endGame} />
                : <StartScreen startGame={props.startGame} />
            }
        </main>
    );
}

export default Main;