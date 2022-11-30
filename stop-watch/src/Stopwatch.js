import { useState, useEffect } from "react";

function Stopwatch() {
    const [totalSeconds, setTotalSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds - (minutes * 60);

    function toggle() {
        setIsActive(!isActive);
    }

    function reset() {
        setTotalSeconds(0);
        setIsActive(false);
    }

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTotalSeconds(seconds => seconds + 10);
            }, 1000);

        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);

        }

        return () => clearInterval(interval);

    }, [isActive, totalSeconds]);

    return (
        <div>
            <h1>{minutes} : {seconds}</h1>

            <button onClick={toggle}>
                {
                    isActive ? 'Pause' : 'Start'
                }
            </button>

            <button onClick={reset}>
                Reset
            </button>
        </div>
    )
}

export default Stopwatch;