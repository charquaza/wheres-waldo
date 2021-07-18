import pokemon from "../images/pokemon-poster-viking011.jpeg";

function Image() {
    return (
        <main>
            <img src={pokemon} alt="All Pokémon from Generations I-VI" />
            <a 
                href="https://www.deviantart.com/viking011/art/Pokemon-Poster-436455502"
                target="_blank"
                rel='noreferrer'
            >Art by Viking011 on DeviantArt</a>
        </main>
    );
}

export default Image;