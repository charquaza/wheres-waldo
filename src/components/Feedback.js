function Feedback(props) {
    //if props.foundPokemon has a value (true or false)
    //then player selection has been validated
    //and feedback should be rendered
    if (props.foundPokemon !== null) {
        var message = props.foundPokemon
            ? `You found ${props.pokemonName}!` 
            : `That's not ${props.pokemonName}`;

        return (
            <div className={"feedback-" + props.foundPokemon}
                style={{top: props.top, left: props.left}}
            >
                <p>{message}</p>
            </div>
        );
    }
    
    return null;
}

export default Feedback;