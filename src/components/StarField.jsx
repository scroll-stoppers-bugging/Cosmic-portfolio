import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const StarField = ({ scrollProgress }) => {
  const groupRef = useRef()
  const starsRef = useRef([])

  useEffect(() => {
    if (!groupRef.current) return

    const layers = 3
    const starsPerLayer = 500

    for (let layer = 0; layer < layers; layer++) {
      const geometry = new THREE.BufferGeometry()
      const positions = []
      const colors = []

      for (let i = 0; i < starsPerLayer; i++) {
        const x = (Math.random() - 0.5) * 200
        const y = (Math.random() - 0.5) * 200
        const z = -100 + layer * 50

        positions.push(x, y, z)

        const colorChoice = Math.random()
        if (colorChoice < 0.6) {
          colors.push(1, 1, 1)
        } else if (colorChoice < 0.8) {
          colors.push(0, 1, 1)
        } else {
          colors.push(1, 0, 1)
        }
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))
      geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colors), 3))

      const material = new THREE.PointsMaterial({
        size: 0.5 + layer * 0.2,
        vertexColors: true,
        sizeAttenuation: true,
        transparent: true
      })

      const stars = new THREE.Points(geometry, material)
      groupRef.current.add(stars)
      starsRef.current.push(stars)
    }
  }, [])

  useFrame(() => {
    if (!groupRef.current) return

    starsRef.current.forEach((stars, index) => {
      const depth = index * 50
      stars.position.z = depth - scrollProgress * 80 * (1 - index * 0.2)
    })
  })

  return <group ref={groupRef} />
}

export default StarField