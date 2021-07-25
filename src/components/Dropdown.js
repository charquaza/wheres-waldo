function Dropdown(props) {
    var top = props.top;
    var left = props.left;

    if (top !== null && left !== null) {
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