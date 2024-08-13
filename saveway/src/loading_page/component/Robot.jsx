/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: komov (https://sketchfab.com/komov)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/walking-robot-bcc389f59ac747eeb7bf377c21b24d78
Title: Walking robot
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Robot(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('./models/robot_final/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null} scale={0.2} position = {[0,-7.4,0]}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="1c5065aca42149bbaefa37de1a75fdbbfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <skinnedMesh
                    name="Object_17"
                    geometry={nodes.Object_17.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_17.skeleton}
                  />
                  <skinnedMesh
                    name="Object_19"
                    geometry={nodes.Object_19.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_19.skeleton}
                  />
                  <skinnedMesh
                    name="Object_21"
                    geometry={nodes.Object_21.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_21.skeleton}
                  />
                  <skinnedMesh
                    name="Object_23"
                    geometry={nodes.Object_23.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_23.skeleton}
                  />
                  <skinnedMesh
                    name="Object_25"
                    geometry={nodes.Object_25.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_25.skeleton}
                  />
                  <skinnedMesh
                    name="Object_27"
                    geometry={nodes.Object_27.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_27.skeleton}
                  />
                  <skinnedMesh
                    name="Object_29"
                    geometry={nodes.Object_29.geometry}
                    material={materials.lambert6}
                    skeleton={nodes.Object_29.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="Object_8" />
                  <group name="Object_10" />
                  <group name="Object_12" />
                  <group name="Object_14" />
                  <group name="Object_16" />
                  <group name="Object_18" />
                  <group name="Object_20" />
                  <group name="Object_22" />
                  <group name="Object_24" />
                  <group name="Object_26" />
                  <group name="Object_28" />
                  <group name="Foot_Right">
                    <group name="RFoot_Bedro" />
                    <group name="RFoot_Golen" />
                    <group name="RFoot_Stopa" />
                    <group name="Stopa_R" />
                  </group>
                  <group name="Foot_Left">
                    <group name="LFoot_Bedro" />
                    <group name="LFoot_Golen" />
                    <group name="LFoot_Stopa" />
                    <group name="Stopa_L" />
                  </group>
                  <group name="Osnova_Centr" />
                  <group name="Osnova_Top_1" />
                  <group name="Objetive_3" />
                  <group name="Objetive_2" />
                  <group name="Osnova_CTRL" position={[-0.001, -1.218, -0.002]}>
                    <group name="Top_CTRL" position={[0, 2.437, 0.002]}>
                      <group name="Objective_Vnesh_CTRL" position={[0, 2.599, 7.942]} />
                      <group name="Objective_Vnutr_CTRL" position={[0, 2.599, 9.49]} />
                    </group>
                  </group>
                  <group name="L_Foot_CTRL" position={[0, 0, -3.695]} />
                  <group name="R_Foot_CTRL" position={[0, 0.008, -0.016]} />
                  <group name="IK_Stopa_L" position={[2.969, -7.777, -3.596]}>
                    <group name="IK_Foot_L" position={[0, 2.409, 1.284]} />
                  </group>
                  <group name="IK_Stopa_R" position={[-2.969, -7.769, 0.083]}>
                    <group name="IK_Foot_R" position={[0, 2.409, 1.284]} />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('./models/robot_final/scene.gltf')
