/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: jarplaw (https://sketchfab.com/jarplaw)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/postholes-test-3fdd6292550548068b1e51f8e6287a81
Title: Postholes Test
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function PortHole_6(props) {
  const { nodes, materials } = useGLTF('./models/porthole_6/scene.gltf')
  return (
    <group {...props} dispose={null} scale={0.06} position ={[1,-9.1,15]}>
      <group position={[0, 0.363, 1.021]} rotation={[-Math.PI, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials.Texture_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_3.geometry}
          material={materials.Texture_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_4.geometry}
          material={materials.Texture_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.Texture_0}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_6.geometry}
          material={materials.Untextured}
        />
      </group>
    </group>
  )
}

useGLTF.preload('./models/porthole_6/scene.gltf')