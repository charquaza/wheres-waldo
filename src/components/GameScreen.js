import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import TargetBox from "./TargetBox";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/storage";

function GameScreen() {
    const [coords, setCoords] = useState({x: null, y: null});

    //on mount, set game start time in firebase 
    useEffect(function setGameStartTime() {
        var db = firebase.firestore();
        db.collection("timer").doc("timestamps").set({
            startTime: Date.now()
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }, []);

    //on mount, get image from firebase
    useEffect(function getImage() {
        //get the main image url from "main-image" folder of firebase storage
        var storage = firebase.storage();
        storage.ref("main-image").list()
            .then((ListResult) => {
                var imageRef = ListResult.items[0];
                return imageRef.getDownloadURL();
            })
            .then((imageURL) => {
                var mainImageElem = document.getElementById("main-image");
                mainImageElem.src = imageURL;
            })
            .catch((error) => {
                console.error("Error retrieving image url: ", error);
            });
    }, []);

    async function handleClick(click) {
        //update function numbers after CSS is finalized

        if (click.target.tagName !== "BUTTON") {
            console.log("Please click a button");
            return;
        }

        try {
            var playerSelection = click.target.id;
            
            //get ratio ranges for id from firebase
            var db = firebase.firestore();
            var DocumentSnapshot = await db.collection("location").doc(playerSelection).get();
            var ratios = DocumentSnapshot.data();
            var {
                xMin: xMinServer, xMax: xMaxServer,
                yMin: yMinServer, yMax: yMaxServer 
            } = ratios;
    
            //calc ratio ranges for click using target box size
    
            //calculate target box dimensions using CSS rule for .target-box
            var boxDimensions = (window.innerWidth > 1000) 
                ? 100 + 10 : window.innerWidth / 10 + 10;
    
            var mainImage = document.getElementById("main-image");
            var imgWidth = mainImage.scrollWidth;
            var imgHeight = mainImage.scrollHeight;
    
            var xMin = (coords.x - boxDimensions / 2) / imgWidth;
            var xMax = (coords.x + boxDimensions / 2) / imgWidth;
    
            //adjust y coordinates for header height
            var headerHeight = window.innerHeight * 0.2;
            var yMin = (coords.y - boxDimensions / 2 - headerHeight) / imgHeight;
            var yMax = (coords.y + boxDimensions / 2 - headerHeight) / imgHeight;
    
            //if ranges do not overlap, incorrect choice
            if (
                (xMin > xMaxServer || xMax < xMinServer) ||
                (yMin > yMaxServer || yMax < yMinServer)
            ) {
                console.log(`Oops, that's not ${click.target.textContent}`)
            } else {
                console.log(`You found ${click.target.textContent}!`);
            }
    
            //remove target box and dropdown box
    
        } catch (error) {
            console.log(error);
        }
    }

    function getCoords(click) {
        var xCoord = click.pageX;
        var yCoord = click.pageY;
        
        console.log("pageX: " + xCoord, "pageY: " + yCoord);
        setCoords({x: xCoord, y: yCoord});
    }

    //display loading message while image loads?
    return (
        <div className="game-screen">
            <Dropdown top={coords.y} left={coords.x} handleClick={handleClick} />
            <TargetBox top={coords.y} left={coords.x} />
            <img 
                id="main-image" onClick={getCoords}
                src="" alt="All Pokémon from Generations I-VI" 
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