import GameScreen from "./GameScreen";
import StartScreen from "./StartScreen";

function Main(props) {
    return (
        <main>
            {props.gameStarted
                ? <GameScreen />
                : <StartScreen startGame={props.startGame} />
            }
        </main>
    );
}

export default Main;