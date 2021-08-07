import PokemonList from "./PokemonList";
import Timer from "./Timer";

function Header(props) {
    return (
        <header>
            <h1>
                {(props.gameEnded)
                    ? "You Caught 'Em All!"
                    : "Gotta Catch 'Em All!"
                }
            </h1>
            <div className="progress-bar">
                {(props.gameEnded)
                    ? <PokemonList />
                    : (props.gameStarted) 
                    ? <>
                        <PokemonList /> 
                        <Timer />
                    </>
                    : false
                }
            </div>
        </header>
    );
}

export default Header;