import { useFrame, useLoader } from "@react-three/fiber";
import {useEffect} from "react";
import { planeGeometry, RepeatWrapping, TextureLoader} from "three";


export const FloatingGrid = ()  =>
   
    {
    const diffuse = useLoader(TextureLoader, process.env.PUBLIC_URL + "./textures/grid-texture.png");

    useEffect(()=> {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(30,30);
        diffuse.offset.set(0,0);
    }, [diffuse]);

    return (

        <mesh rotation-x={-Math.PI * 0.5} position = {[4.5,-8,0]} scale ={5}>

            <planeGeometry args = {[35,35]} />
            <meshBasicMaterial
                color={[1,1,1]}
                opacity={0}
                map={diffuse}
                alphaMap={diffuse}
                transparent={true}
            />
        </mesh> 
    );



}