import PokemonList from "./PokemonList";

function StartScreen(props) {
    return (
        <div className="start-screen">
            <p>Can you find and catch these Pokémon?</p>
            <p>Click to capture.</p>
            <PokemonList />
            <button onClick={props.startGame}>Start</button>
        </div>
    );
}

export default StartScreen;