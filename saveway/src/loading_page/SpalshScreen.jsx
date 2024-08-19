import React from "react";
import "./splashscreen.css"; 
import { CircleLoader } from "react-spinners";

const SplashScreen = () => {
    return (

        <div className="splash">
            <CircleLoader color="#737B8F"   
            size={90}
 />
        </div>
    )
}

export default SplashScreen;