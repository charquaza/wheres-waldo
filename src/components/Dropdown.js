function Dropdown(props) {
    var top = props.top;
    var left = props.left;

    if (top !== null && left !== null) {
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
                <ul>
                    <li><button>Charizard</button></li>
                    <li><button>Greninja</button></li>
                    <li><button>Shiny Tentacool</button></li>
                    <li><button>MissingNo.</button></li>
                </ul>
            </div>
        );
    }

    return null;
}

export default Dropdown;