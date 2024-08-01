import React from "react";
import {Canvas} from "@react-three/fiber";
import {LoadInside} from "./LoadInside";
import './loadingpage.css';
import City from "./component/City";
import Tubular from './component/Tubular';
import RubberCone from './component/RubberCone';
import { PortHole_1 } from "./component/PortHole_1";
import { PortHole_2 } from "./component/PortHole_2";
import { PortHole_3 } from "./component/PortHole_3";
import { PortHole_4 } from "./component/PortHole_4";

export default function LoadingPage(){

    return (
    <Canvas camera={{fov:90, position: [-25,50,75]}}>

        <LoadInside/>
        <City />
        <RubberCone />
        <Tubular />
        <PortHole_2 />
        <PortHole_3 />
        

    </Canvas>
    )

};

