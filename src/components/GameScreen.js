import { useState, useEffect, useRef } from "react";
import Dropdown from "./Dropdown";
import TargetBox from "./TargetBox";
import Feedback from "./Feedback";
import firebase from "../firebase";
import "firebase/firestore";
import "firebase/storage";
import { computeCoordinateRanges } from "../util";


function GameScreen(props) {
    const [coords, setCoords] = useState({x: null, y: null});
    const [searchList, setSearchList] = useState([]);
    const [userSelection, setUserSelection] = useState({id: null, name: null});
    const [foundPokemon, setFoundPokemon] = useState(null);

    var userId = props.userId;

    //on mount, set game start time
    useEffect(() => {
        async function setupNewUser() {
            var db = firebase.firestore();

            //set game start time
            db.collection("timestamps").doc(userId).set({
                startTime: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        setupNewUser();
    }, []);

    //on mount, get main image from firebase
    useEffect(function getImage() {
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
    }, []);

    //when coords change, get list of pokemon to find
    useEffect(() => {
        //get search list if user has clicked image
        //user has clicked image if coords are set
        var db = firebase.firestore();

        db.collection("users").doc(userId).get()
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
                //get coordinate ranges for user selection from firebase
                var db = firebase.firestore();
                var pokemonDataSnapshot = await db.collection("users").doc(userId).get();
                var pokemonData = pokemonDataSnapshot.data();
                var {
                    xMin: xMinServer, xMax: xMaxServer,
                    yMin: yMinServer, yMax: yMaxServer 
                } = pokemonData[userSelection.id].coords;
        
                //get coordinate ranges for click event
                var {
                    xMin, xMax,
                    yMin, yMax 
                } = computeCoordinateRanges(coords.x, coords.y);
        
                //if ranges do not overlap, incorrect choice
                if (
                    (xMin > xMaxServer || xMax < xMinServer) ||
                    (yMin > yMaxServer || yMax < yMinServer)
                ) {
                    setFoundPokemon(false);
                } else {
                    setFoundPokemon(true);
                    
                    let foundAllPokemon = true;

                    //update pokemon found status to true
                    //and check if all pokemon have been found
                    for (const pokemon in pokemonData) {
                        let currID = pokemonData[pokemon].id;

                        if (!pokemonData[pokemon].found) {
                            if (currID === userSelection.id) {
                                db.collection("users").doc(userId).update({
                                    [`${currID}.found`]: true
                                });
                            } else {
                                foundAllPokemon = false;
                            }
                        }
                    }

                    if (foundAllPokemon) {
                        //set game end time
                        await db.collection("timestamps").doc(userId).set({
                            endTime: firebase.firestore.FieldValue.serverTimestamp()
                        }, { merge: true });
                        
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