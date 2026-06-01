import React, { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const NebulaClouds = ({ scrollProgress }) => {
  const groupRef = useRef()
  const cloudsRef = useRef([])

  useEffect(() => {
    if (!groupRef.current) return

    const nebulaCount = 5
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 512

    const ctx = canvas.getContext('2d')
    const imageData = ctx.createImageData(512, 512)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const value = Math.random() > 0.7 ? Math.random() * 255 : 0
      data[i] = value * 0.5
      data[i + 1] = value * 0.2
      data[i + 2] = value * 1.5
      data[i + 3] = Math.max(0, value - 100)
    }

    ctx.putImageData(imageData, 0, 0)
    const texture = new THREE.CanvasTexture(canvas)

    for (let i = 0; i < nebulaCount; i++) {
      const geometry = new THREE.SphereGeometry(30 + i * 10, 32, 32)
      const material = new THREE.MeshStandardMaterial({
        map: texture,
        emissive: new THREE.Color(
          Math.random() > 0.5 ? 0xff00ff : 0x0066ff
        ),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.3,
        wireframe: false
      })

      const cloud = new THREE.Mesh(geometry, material)
      cloud.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 300,
        -200 + i * 100
      )

      groupRef.current.add(cloud)
      cloudsRef.current.push({
        mesh: cloud,
        rotationSpeed: (Math.random() - 0.5) * 0.0005,
        driftSpeed: (Math.random() - 0.5) * 0.02
      })
    }
  }, [])

  useFrame(() => {
    cloudsRef.current.forEach(({ mesh, rotationSpeed, driftSpeed }) => {
      mesh.rotation.x += rotationSpeed
      mesh.rotation.y += rotationSpeed * 1.5
      mesh.position.y += Math.sin(Date.now() * 0.0001) * driftSpeed
      mesh.position.z -= scrollProgress * 0.1
    })
  })

  return <group ref={groupRef} />
}

export default NebulaClouds