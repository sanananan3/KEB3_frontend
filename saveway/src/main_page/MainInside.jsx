import { OrbitControls, ScrollControls } from "@react-three/drei";
import { Office } from "./component/Office";
import { Overlay } from "./Overlay";

export const MainInside = () => {

    return (
        <>
        <ambientLight intensity={1} /> 
        <directionalLight position={[4,5,6]} intensity = {1.2} color={'#ffffff'} />     
         <OrbitControls enableZoom={false} />

        <ScrollControls pages={3} damping={0.25}>
            <Overlay /> 
         <Office /> 
         </ScrollControls>
        </>


    );


}