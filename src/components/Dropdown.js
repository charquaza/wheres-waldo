function Dropdown(props) {
    var top = props.top;
    var left = props.left;

    //if props.foundPokemon has a value (true or false)
    //then player selection has been validated
    //and dropdown box should not be rendered
    if (
        top !== null && left !== null 
        && props.foundPokemon === null
    ) {
        //calculate target box dimensions using CSS rule for .target-box
        var boxDimensions = (window.innerWidth > 1000) 
            ? 100 + 10 : window.innerWidth / 10 + 10;

        //position dropdown box to bottom right corner of target box
        //later - change position if click on image edge
        top += boxDimensions / 2;
        left += boxDimensions / 2;

        return (
            <div 
                className="dropdown-box"
                style={{top: top, left: left}}
            >
                <ul onClick={props.handleClick}>
                    {/* how to sort names? */}
                    {props.choices.map((choice) => {
                        return (
                            <li key={choice.id}>
                                <button id={choice.id}>{choice.name}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    return null;
}

export default Dropdown;