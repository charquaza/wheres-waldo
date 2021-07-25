import Charizard from "../images/charizard.png";
import Greninja from "../images/greninja.png";
import ShinyTentacool from "../images/shiny-tentacool.png";
import MissingNo from "../images/missing-no.png";

function PokemonList() {
    return (
        <ul>
            <li>
                <img src={Charizard} alt="Charizard" />
            </li>
            <li>
                <img src={Greninja} alt="Greninja" />
            </li>
            <li>
                <img src={ShinyTentacool} alt="Shiny Tentacool" />
            </li>
            <li>
                <img src={MissingNo} alt="MissingNo." />
            </li>
        </ul>
    );
}

export default PokemonList;