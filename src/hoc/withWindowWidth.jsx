import React, {useEffect, useState} from 'react';


const WithWindowWidth = (WrappedComponent, size) => {
    function WithWindowWidth() {
        const [windowWidth, setWindowWidth] = useState(true)
        const changeWindowSize = () => {
            const width = window.innerWidth
            if (width <= size) {
                setWindowWidth(false)
            } else {
                setWindowWidth(true)
            }
        };

        useEffect(() => {
            const width = window.innerWidth
            window.addEventListener("resize", changeWindowSize)
            if (width <= size) {
                setWindowWidth(false)
            } else {
                setWindowWidth(true)
            }
            return () => {
                window.removeEventListener("resize", changeWindowSize)
            }
        }, [windowWidth])
        return (
            <div>
                <WrappedComponent windowWidth={windowWidth}/>
            </div>
        );
    }

    return WithWindowWidth
}

export default WithWindowWidth;