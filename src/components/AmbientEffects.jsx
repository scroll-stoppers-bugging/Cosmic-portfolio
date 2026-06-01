import React, { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const AmbientEffects = ({ scrollProgress }) => {
  const particleGroupRef = useRef()
  const particlesRef = useRef([])

  useEffect(() => {
    if (!particleGroupRef.current) return

    const particleCount = 200

    const geometry = new THREE.BufferGeometry()
    const positions = []
    const velocities = []

    for (let i = 0; i < particleCount; i++) {
      positions.push(
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500,
        (Math.random() - 0.5) * 500
      )

      velocities.push(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.1
      )
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), 3))

    const material = new THREE.PointsMaterial({
      size: 0.3,
      color: 0x00ffff,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true
    })

    const particles = new THREE.Points(geometry, material)
    particleGroupRef.current.add(particles)

    particlesRef.current = {
      geometry,
      particles,
      velocities,
      positions: Array.from(positions)
    }
  }, [])

  useFrame(() => {
    if (!particlesRef.current.geometry) return

    const { geometry, particles, velocities, positions } = particlesRef.current
    const posAttribute = geometry.getAttribute('position')
    const posArray = posAttribute.array

    for (let i = 0; i < posArray.length; i += 3) {
      const idx = i / 3
      const vIdx = idx * 3

      posArray[i] += velocities[vIdx]
      posArray[i + 1] += velocities[vIdx + 1]
      posArray[i + 2] += velocities[vIdx + 2]

      if (Math.abs(posArray[i]) > 250) posArray[i] = -posArray[i]
      if (Math.abs(posArray[i + 1]) > 250) posArray[i + 1] = -posArray[i + 1]
      if (Math.abs(posArray[i + 2]) > 250) posArray[i + 2] = -posArray[i + 2]
    }

    posAttribute.needsUpdate = true

    particles.rotation.z += 0.00005
  })

  return <group ref={particleGroupRef} />
}

export default AmbientEffects