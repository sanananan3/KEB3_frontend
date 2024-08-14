import { ContactShadows, OrbitControls, Sparkles } from "@react-three/drei";
import  React, { useRef, useState, useEffect} from "react";
import { useFrame } from "@react-three/fiber";
import { Depth, LayerMaterial , Noise} from "lamina";
import * as THREE from "three";
import {CameraControls} from './Camera'
import {Bloom, DepthField, DepthOfField, EffectComposer, Vignette} from '@react-three/postprocessing';
import { Cloud_1 } from "./background/Cloud_1";
import { Cloud_1_2 } from "./background/Cloud_1_2";
import {Cloud_1_3} from "./background/Cloud_1_3";
import {Cloud_1_4} from "./background/Cloud_1_4";
import {Cloud_1_5} from "./background/Cloud_1_5";
import {Cloud_1_6} from "./background/Cloud_1_6";

import { Cloud_2 } from "./background/Cloud_2";
import { Cloud_2_2 } from "./background/Cloud_2_2";
import {Cloud_2_3} from "./background/Cloud_2_3";
import {Cloud_2_4} from "./background/Cloud_2_4";
import {Cloud_4} from "./background/Cloud_4";

import { FloatingGrid } from "./background/FloatingGrid";
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import {Html} from "@react-three/drei";


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

    const [position, setPosition] = useState({x:-5,y:1,z:50});
    const [isLoginOpen, setIsLoginOpen] = useState(true); // 로그인 팝업 열기/닫기 상태
    const [isSignUpOpen, setIsSignUpOpen] = useState(false); // 가입 팝업 열기/닫기 상태
    const startTime = useRef();
    const initialLoadComplete = useRef(false);
    


  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignUpOpen = () => {
    setIsLoginOpen(false);
    setIsSignUpOpen(true);
  };

  const handleSignUpClose = () => {
    setIsSignUpOpen(false);
    setIsLoginOpen(true);
  };



    // useFrame => 프레임 단위로 처리 
    // useEffect => 컴포넌트의 생명주기 동안 특정 작업을 수행하기 위해 사용하는 Hook 
    //
    useEffect(() => {
        // 초기 카메라 위치로 이동하는 애니메이션이 완료된 후  시작 시간을 기록한다. 

        const timeoutId = setTimeout(()=> {
            initialLoadComplete.current = true;
            startTime.current = Date.now();

        }, 1500);

        return () => clearTimeout(timeoutId);
    
    }, []);

    useFrame(() => {
        
        if (initialLoadComplete.current && startTime.current) {

            const elapsedTime = (Date.now() - startTime.current) / 1000;
            
            if (elapsedTime < 6 ) {
                setPosition((prev) => ({ ...prev, z:40+20*elapsedTime}));
               
            }

            else if (elapsedTime >= 6 && elapsedTime < 7) {
                setPosition((prev) => ({ ...prev, z: 100 }));
            } else if (elapsedTime >= 14) {
                setIsLoginOpen(true); // 로그인 팝업창 뜨게 하기 
            }
            
        }
    });



    return (
        <>

        <OrbitControls
            enableDamping={true} enableRotate={false}
          />

        {/* 배경효과 */}

        {/* 1. sparkles */}
            <Sparkles noise = {0} count= {1200} speed ={0.6} size = {1} color = {"#5DEBD7"} opacity = {6} scale ={[-300,-500,300]}></Sparkles> 
            <Sparkles noise = {0.6} count= {800} speed ={0.6} size = {1.2} color = {"#5DEBD7"} opacity = {6} scale ={[-300,-500,300]}></Sparkles> 
            <Sparkles noise = {1.2} count= {200} speed ={0.6} size = {2} color = {"#5DEBD7"} opacity = {6} scale ={[-300,-500,300]}></Sparkles> 
            <Sparkles noise = {0.3} count= {1500} speed ={0.6} size = {1.2} color = {"#5DEBD7"} opacity = {6} scale ={[-300,-500,300]}></Sparkles> 
            <Sparkles noise = {0.3} count= {1500} speed ={0.6} size = {0.8} color = {"#5DEBD7"} opacity = {6} scale ={[-300,-500,300]}></Sparkles> 

            <ambientLight intensity = {3.5} />
            <directionalLight position={[4,5,6]} intensity = {1.2} color={'#ffffff'} />        

            <EffectComposer>
                <Bloom intensity = {0.4} luminanceThreshold={0.5} luminanceSmoothing={0.4} height={500} />
                <DepthOfField focusDistacne = {0} focalLength={0.5} bokeScale={1.2} height={500} />
                <Vignette eskil={false} offset={.1} darkness={0.8} />
            </EffectComposer>

            <CameraControls position={position} />
            <ContactShadows scale={30} opacity={0.3} />
            
            <Background />
            <Cloud_1 />
            <Cloud_1_2 />
            <Cloud_1_3 />
            <Cloud_1_5 />
            <Cloud_1_6 />

            <Cloud_2 />
            <Cloud_2_2 />
            <Cloud_2_3 />
            <Cloud_2_4 />
            <Cloud_4 />

            <FloatingGrid />

            {/* Login Popup - 2D  */}

            {isLoginOpen && <Login onClose={handleLoginClose} onSignUp={handleSignUpOpen} />}
            {isSignUpOpen && <SignUp onClose={handleSignUpClose} />}

        </>
    )

}