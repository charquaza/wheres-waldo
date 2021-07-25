import PokemonList from "./PokemonList";
import Timer from "./Timer";

function Header(props) {
    return (
        <header>
            <h1>Gotta Catch 'Em All!</h1>
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