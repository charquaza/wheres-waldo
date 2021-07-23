import { useState } from "react";
import Dropdown from "./Dropdown";
import pokemon from "../images/pokemon-poster-viking011.jpeg";

function Image() {
    const [coords, setCoords] = useState({x: null, y: null});

    function getCoords(click) {
        var xCoord = click.pageX;
        var yCoord = click.pageY;
        
        setCoords({x: xCoord, y: yCoord});
    }

    return (
        <main>
            <Dropdown top={coords.y} left={coords.x} />
            <img 
                onClick={getCoords}
                src={pokemon} alt="All Pokémon from Generations I-VI" 
            />
            <a 
                href="https://www.deviantart.com/viking011/art/Pokemon-Poster-436455502"
                target="_blank"
                rel='noreferrer'
            >Art by Viking011 on DeviantArt</a>
        </main>
    );
}

export default Image;