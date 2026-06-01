import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import CosmicScene from './components/CosmicScene'
import ScrollContent from './components/ScrollContent'
import { useCosmicScroll } from './hooks/useCosmicScroll'
import './styles/global.css'

function App() {
  const { scrollProgress, cameraPosition } = useCosmicScroll()

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.0.42/dist/lenis.min.js'
    document.head.appendChild(script)
  }, [])

  return (
    <div className="cosmic-container">
      <Canvas
        id="canvas"
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          pixelRatio: Math.min(window.devicePixelRatio, 2)
        }}
      >
        <CosmicScene scrollProgress={scrollProgress} cameraPosition={cameraPosition} />
      </Canvas>

      <div id="content">
        <ScrollContent scrollProgress={scrollProgress} />
      </div>
    </div>
  )
}

export default App