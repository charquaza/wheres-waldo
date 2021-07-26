import { useState, useRef, useEffect } from "react";

function Timer() {
    const startTimeRef = useRef(Date.now());
    
    const [currTime, setCurrTime] = useState(startTimeRef.current);

    useEffect(() => {
        var timer = setInterval(() => {
            setCurrTime(Date.now());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <p>{Math.floor((currTime - startTimeRef.current) / 1000)}</p>
    );
}

export default Timer;