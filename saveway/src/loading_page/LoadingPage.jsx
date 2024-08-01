import React from "react";
import {Canvas} from "@react-three/fiber";
import {LoadInside} from "./LoadInside";
import './loadingpage.css';
import City from "./component/City";
import StreetAsset from './component/StreetAsset';
import StreetAsset2 from './component/StreetAsset2';
import RubberCone from './component/RubberCone';
import { StringKeyframeTrack } from "three";

export default function LoadingPage(){

    return (
    <Canvas camera={{fov:90, position: [-25,50,75]}}>
        <LoadInside/>
        <City />
        <RubberCone />
        <StreetAsset2 />
    </Canvas>
    )

};

