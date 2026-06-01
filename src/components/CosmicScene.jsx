import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import StarField from './StarField'
import NebulaClouds from './NebulaClouds'
import AmbientEffects from './AmbientEffects'

const CosmicScene = ({ scrollProgress, cameraPosition }) => {
  const { camera } = useThree()
  const sceneRef = useRef()

  useFrame(() => {
    if (camera) {
      const targetZ = 50 - scrollProgress * 150
      const targetY = Math.sin(scrollProgress * Math.PI) * 20

      camera.position.z += (targetZ - camera.position.z) * 0.1
      camera.position.y += (targetY - camera.position.y) * 0.1
      camera.lookAt(0, 0, camera.position.z - 10)
    }
  })

  return (
    <>
      <color attach="background" args={['#000000']} />
      
      <StarField scrollProgress={scrollProgress} />
      <NebulaClouds scrollProgress={scrollProgress} />
      <AmbientEffects scrollProgress={scrollProgress} />
      
      <ambientLight intensity={0.3} color="#1a0033" />
      <pointLight position={[0, 0, 50]} intensity={1} color="#00ffff" />
      <pointLight position={[-50, 0, 0]} intensity={0.8} color="#ff00ff" />
      <pointLight position={[50, 0, 0]} intensity={0.8} color="#0066ff" />
      
      <fog attach="fog" args={['#000000', 1, 500]} />
    </>
  )
}

export default CosmicScene