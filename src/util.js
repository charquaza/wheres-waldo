export function computeCoordinateRanges(x, y) {
    //calculate target box dimensions using CSS rule for .target-box
    var boxDimensions = (window.innerWidth > 1000) 
        ? 100 + 10 : window.innerWidth / 10 + 10;

    //get main image dimensions
    var mainImage = document.getElementById("main-image");
    var imgWidth = mainImage.scrollWidth;
    var imgHeight = mainImage.scrollHeight;

    //given area of target box,
    //calculate x and y ranges relative to position of image
    var xMin = (x - boxDimensions / 2) / imgWidth;
    var xMax = (x + boxDimensions / 2) / imgWidth;

    //adjust y ranges for header height
    var headerHeight = window.innerHeight * 0.2;
    var yMin = (y - boxDimensions / 2 - headerHeight) / imgHeight;
    var yMax = (y + boxDimensions / 2 - headerHeight) / imgHeight;

    return { xMin, xMax, yMin, yMax };
}