function TargetBox(props) {
    var top = props.top;
    var left = props.left;

    if (top !== null && left !== null) {
        //calculate target box dimensions using CSS rule for .target-box
        var boxDimensions = (window.innerWidth > 1000) 
            ? 100 + 10 : window.innerWidth / 10 + 10;

        //center target box on click site
        top -= boxDimensions / 2;
        left -= boxDimensions / 2;

        return (
            <div 
                className="target-box"
                style={{top: top, left: left}}
            >
            </div>
        );
    }

    return null;
}

export default TargetBox;