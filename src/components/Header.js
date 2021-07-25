import PokemonList from "./PokemonList";
import Timer from "./Timer";

function Header(props) {
    return (
        <header>
            <h1>Where's Waldo?</h1>
            {props.gameStarted &&
                <div className="progress-bar">
                    <PokemonList /> 
                    <Timer />
                </div>
            }
        </header>
    );
}

export default Header;