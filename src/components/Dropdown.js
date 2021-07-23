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
                    <li>Charizard</li>
                    <li>Greninja</li>
                    <li>Shiny Tentacool</li>
                    <li>MissingNo.</li>
                </ul>
            </div>
        );
    }

    return null;
}

export default Dropdown;