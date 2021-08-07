import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import TargetBox from "./TargetBox";
import Feedback from "./Feedback";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/storage";

function GameScreen(props) {
    const [coords, setCoords] = useState({x: null, y: null});
    const [searchList, setSearchList] = useState([]);
    const [userSelection, setUserSelection] = useState({id: null, name: null});
    const [foundPokemon, setFoundPokemon] = useState(null);

    //on mount, reset all found statuses to false
    //remove later
    useEffect(function resetFoundStatus() {
        var db = firebase.firestore();

        db.collection("toFind").doc("pokemonList").get()
            .then((DocumentSnapshot) => {
                var pokemonData = DocumentSnapshot.data();
                
                for (const pokemon in pokemonData) {
                    db.collection("toFind").doc("pokemonList").update({
                        [`${pokemon}.found`]: false
                    });
                }
            });

    }, []);

    //on mount, set game start time in firebase 
    useEffect(function setGameStartTime() {
        var db = firebase.firestore();
        db.collection("timer").doc("timestamps").set({
            startTime: firebase.firestore.FieldValue.serverTimestamp()
        })
        .catch((error) => {
            console.error("Error writing start time: ", error);
        });
    }, []);

    //on mount, get main image from firebase
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

    //when coords change, get list of pokemon to find
    useEffect(() => {
        //get search list if user has clicked image
        //user has clicked image if coords are set
        var db = firebase.firestore();
        db.collection("toFind").doc("pokemonList").get()
            .then((DocumentSnapshot) => {
                var pokemonList = DocumentSnapshot.data();
                var remainingPokemon = [];
                for (const pokemon in pokemonList) {
                    if (!pokemonList[pokemon].found) {
                        remainingPokemon.push({
                            id: pokemonList[pokemon].id,
                            name: pokemonList[pokemon].name
                        });
                    }
                }
                setSearchList(remainingPokemon);
            });
    }, [coords.x, coords.y]);

    //validate every new selection
    useEffect(() => {
        async function validateSelection() {
            try {
                //get ratio ranges for id from firebase
                var db = firebase.firestore();
    
                var locationSnapshot = db.collection("location").doc(userSelection.id).get();
                var pokemonListSnapshot = db.collection("toFind").doc("pokemonList").get();
    
                var snapshots = await Promise.all([locationSnapshot, pokemonListSnapshot])
    
                var locationData = snapshots[0].data();
                var pokemonData = snapshots[1].data();
    
                var {
                    xMin: xMinServer, xMax: xMaxServer,
                    yMin: yMinServer, yMax: yMaxServer 
                } = locationData;
        
                //update function numbers after CSS is finalized
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
                    console.log(`Oops, that's not ${userSelection.name}`);
                    setFoundPokemon(false);
                } else {
                    console.log(`You found ${userSelection.name}!`);
                    setFoundPokemon(true);
                    
                    let foundAllPokemon = true;
                    for (const pokemon in pokemonData) {
                        let currID = pokemonData[pokemon].id;

                        if (!pokemonData[pokemon].found) {
                            if (currID === userSelection.id) {
                                db.collection("toFind").doc("pokemonList").update({
                                    [`${currID}.found`]: true
                                });
                            } else {
                                foundAllPokemon = false;
                            }
                        }
                    }

                    if (foundAllPokemon) {
                        //trigger end game behavior:
                        //1. setGameEndTime in firebase
                        //2. get gameStartTime and calculate total time taken
                        //3. render endgame screen, displaying win message and time taken to complete

                        //alert should show after last green feedback
                        //maybe use state, e.g. setWonGame(true)
                        console.log("you won!");

                        await db.collection("timer").doc("timestamps").set({
                            endTime: firebase.firestore.FieldValue.serverTimestamp()
                        }, { merge: true })
                        
                        props.endGame();
                    }
                }
        
            } catch (error) {
                console.log(error);
            }
        }
        
        if (userSelection.id && foundPokemon === null) {
            validateSelection();
        }
    });

    function handleSelection(click) {
        if (click.target.tagName !== "BUTTON") {
            console.log("Please click a button");
            return;
        }

        var selectionID = click.target.id;
        var selectionName = click.target.textContent;

        setUserSelection({id: selectionID, name: selectionName});
    }

    function handleImageClick(click) {
        var xCoord = click.pageX;
        var yCoord = click.pageY;
        
        //reset state
        setCoords({x: xCoord, y: yCoord});
        setSearchList([]);
        setUserSelection({id: null, name: null});
        setFoundPokemon(null);
    }

    //display loading message while image loads?
    return (
        <div className="game-screen">
            <Dropdown top={coords.y} left={coords.x} choices={searchList} 
                foundPokemon={foundPokemon} handleClick={handleSelection} />
            <TargetBox top={coords.y} left={coords.x} 
                foundPokemon={foundPokemon} />
            {/* render Feedback if foundPokemon !== null */}
            <Feedback top={coords.y} left={coords.x} foundPokemon={foundPokemon} 
                pokemonName={userSelection.name}
            />
            <img 
                id="main-image" onClick={handleImageClick}
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