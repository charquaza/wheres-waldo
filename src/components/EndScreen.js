import { useState, useEffect } from "react";
import firebase from "../firebase";
import "firebase/firestore";

function EndScreen() {
    const [totalTime, setTotalTime] = useState(null);

    //get start and end time
    useEffect(() => {
        async function calculateTime() {
            var db = firebase.firestore();
            var DocumentSnapshot = await db.collection("timer").doc("timestamps").get();
            var timestamps = DocumentSnapshot.data();
            setTotalTime(timestamps.endTime.seconds - timestamps.startTime.seconds);
        }

        calculateTime();
    }, []);

    return (
        <div>
            <p>Congratulations!</p>
            {(totalTime !== null) &&
                <p>It took you <strong>{totalTime}</strong> seconds to catch them all.</p>
            }
        </div>
    );
}

export default EndScreen;