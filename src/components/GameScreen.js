import Dropdown from "./Dropdown";
import TargetBox from "./TargetBox";
import { useState } from "react";
import pokemon from "../images/pokemon-poster-viking011.jpeg";

function GameScreen() {
    const [coords, setCoords] = useState({x: null, y: null});

    function getCoords(click) {
        var xCoord = click.pageX;
        var yCoord = click.pageY;

        console.log(xCoord, yCoord);
        
        setCoords({x: xCoord, y: yCoord});
    }

    return (
        <div className="game-screen">
            <Dropdown top={coords.y} left={coords.x} />
            <TargetBox top={coords.y} left={coords.x} />
            <img 
                onClick={getCoords}
                src={pokemon} alt="All Pokémon from Generations I-VI" 
            />
            <a 
                href="https://www.deviantart.com/viking011/art/Pokemon-Poster-436455502"
                target="_blank"
                rel='noreferrer'
            >Art by Viking011 on DeviantArt</a>
        </div>
    );
}

export default GameScreen;