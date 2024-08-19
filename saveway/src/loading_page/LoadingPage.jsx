import React, { useEffect, useState } from "react";
import {Canvas} from "@react-three/fiber";
import {LoadInside} from "./LoadInside";
import './loadingpage.css';
import City from "./component/City";
import Tubular from './component/Tubular';
import RubberCone from './component/RubberCone';
import {Robot_3} from './component/Robot_3';
import {PortHole_5_2} from "./component/PortHole_5_2";
import {PortHole_5} from "./component/PortHole_5";
import {PortHole_6} from "./component/PortHole_6";
import {PortHole_7} from "./component/PortHole_7";
import {PortHole_6_2} from "./component/PortHole_6_2";

export default function LoadingPage({ onLoaded }){

    return (
    <Canvas camera={{fov:80, position: [-20,60,85]}}>

        <LoadInside  />
        <City/>
        <RubberCone />
        <Tubular />
        <PortHole_5 />
        <PortHole_5_2/>
        <PortHole_6 /> 
        <PortHole_6_2 />
        <PortHole_7 />
        <Robot_3 />

    </Canvas>
    )

};

