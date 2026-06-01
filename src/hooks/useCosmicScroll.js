import { useEffect, useState } from 'react'

export const useCosmicScroll = () => {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [cameraPosition, setCameraPosition] = useState([0, 0, 50])

  useEffect(() => {
    let scrollTimeout

    const handleScroll = () => {
      clearTimeout(scrollTimeout)

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0

      setScrollProgress(progress)

      const cameraZ = 50 - progress * 150
      const cameraY = Math.sin(progress * Math.PI) * 20

      setCameraPosition([0, cameraY, cameraZ])
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return { scrollProgress, cameraPosition }
}