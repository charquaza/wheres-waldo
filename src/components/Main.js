import { useEffect, useRef } from "react";
import StartScreen from "./StartScreen";
import GameScreen from "./GameScreen";
import EndScreen from "./EndScreen";
import firebase from "../firebase";
import "firebase/firestore";

function Main(props) {
    const userIdRef = useRef(null);

    //on mount, create new user document
    useEffect(() => {
        async function createNewUserDoc() {
            var db = firebase.firestore();

            //get pokemon data from template doc
            var pokemonDataSnapshot = await db.collection("toFind").doc("pokemonList").get();
            var pokemonData = pokemonDataSnapshot.data()
    
            //copy pokemon data to new user document
            var userDoc = await db.collection("users").add(pokemonData);

            //store user ID
            userIdRef.current = userDoc.id;
        }
        
        createNewUserDoc();
    }, []);

    return (
        <main>
            {(props.gameEnded)
                ? <EndScreen userId={userIdRef.current} />
                : (props.gameStarted)
                ? <GameScreen endGame={props.endGame} userId={userIdRef.current} />
                : <StartScreen startGame={props.startGame} />
            }
        </main>
    );
}

export default Main;