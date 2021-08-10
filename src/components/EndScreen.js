import { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";

function EndScreen(props) {
    const [totalTime, setTotalTime] = useState(null);

    //calculate total time taken to complete game
    useEffect(() => {
        async function calculateTime() {
            var db = firebase.firestore();
            var DocumentSnapshot = await db.collection("timestamps").doc(props.userId).get();
            var timestamps = DocumentSnapshot.data();
            setTotalTime(timestamps.endTime.seconds - timestamps.startTime.seconds);
        }

        calculateTime();
    }, []);

    return (
        <div className="end-screen">
            <p>Well done!</p>
            {(totalTime !== null) &&
                <p>It took you <strong>{totalTime}</strong> seconds to catch them all.</p>
            }
        </div>
    );
}

export default EndScreen;