/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Andrey Martyanov (https://sketchfab.com/3dartel)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/cloud-test-6d1fff581b3a424d88ee2125f909f3f3
Title: Cloud Test
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Cloud_2_3(props) {
  const { nodes, materials } = useGLTF('./models/background/loading/cloud_2/scene.gltf')
  return (
    <group {...props} dispose={null} scale={18} position={[150,60,-200]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Plane001_08_-_Default_0'].geometry}
        material={materials['08_-_Default']}
        position={[-0.787, 0, -5.259]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('./models/background/loading/cloud_2/scene.gltf')
