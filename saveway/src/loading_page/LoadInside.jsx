import { ContactShadows, OrbitControls, Sparkles } from "@react-three/drei";
import  React, { useRef, useState} from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Depth, LayerMaterial , Noise} from "lamina";
import * as THREE from "three";
import {CameraControls} from './Camera'
import {Bloom, DepthField, DepthOfField, EffectComposer, Vignette} from '@react-three/postprocessing';



const Background = () => {
    const BG_SPEED = 0.15;
    const ref = useRef();

    useFrame((_state, delta) => {
        ref.current.rotation.x += BG_SPEED * delta;
        ref.current.rotation.y += BG_SPEED * delta;
        ref.current.rotation.z += BG_SPEED * delta;
    });

    return (
        <mesh ref={ref} scale={300}>
            <sphereGeometry args={[1,100,100]} />
            <LayerMaterial side = {THREE.BackSide}>

                <Depth
                    colorA="#201E43"
                    colorB="#7FA1C3"
                    alpha={1}
                    mode="normal"
                    near={130}
                    far={240}
                    origin={[100,100,-100]}
                    />

            </LayerMaterial>
        </mesh>
    );
};

export const LoadInside = () => {

    const [position] = useState({x:-10,y:-5,z:20})
    
    return (
        <>

        <OrbitControls
            enableDamping={true}
            enableRotate={false}
          />


            <Sparkles noise = {0} count= {1200} speed ={0.6} size = {1} color = {"#5DEBD7"} opacity = {6} scale ={[-300,-500,300]}></Sparkles> 
            <ambientLight intensity = {2} />
            <directionalLight position={[4,5,6]} intensity = {2.5} color={'#ffffff'} />        

            <EffectComposer>
                <Bloom intensity = {0.4} luminanceThreshold={0.5} luminanceSmoothing={0.4} height={500} />
                <DepthOfField focusDistacne = {0} focalLength={0.5} bokeScale={1.2} height={500} />
                <Vignette eskil={false} offset={.1} darkness={0.8} />
            </EffectComposer>

            <CameraControls position={position} />
            <ContactShadows scale={30} opacity={0.3} />
            
            <Background />


        </>
    )

}