import {Canvas} from '@react-three/fiber';
import './mainpage.css';
import {useState} from 'react';
import { MainInside } from './MainInside';

function MainPage() {

    return (

        <Canvas>
            <MainInside />
        </Canvas>
    )


}

export default MainPage