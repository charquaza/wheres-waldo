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

    function getCoords(click) {
        var xCoord = click.pageX;
        var yCoord = click.pageY;
        
        console.log("pageX: " + xCoord, "pageY: " + yCoord);
        setCoords({x: xCoord, y: yCoord});
    }

    //display loading message while image loads?
    return (
        <div className="game-screen">
            <Dropdown top={coords.y} left={coords.x} />
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