import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../../styles/portfolio.css'

const Portfolio = ({ scrollProgress }) => {
  const containerRef = useRef()
  const starsRef = useRef([])

  const projects = [
    { id: 1, title: 'Project Alpha', category: 'Digital Experience' },
    { id: 2, title: 'Project Beta', category: 'Interactive Design' },
    { id: 3, title: 'Project Gamma', category: 'Web Application' },
    { id: 4, title: 'Project Delta', category: 'Brand Experience' },
    { id: 5, title: 'Project Epsilon', category: 'Visual Design' },
    { id: 6, title: 'Project Zeta', category: '3D Experience' },
  ]

  useEffect(() => {
    const svg = containerRef.current?.querySelector('svg')
    if (!svg) return

    const points = starsRef.current.map(el => {
      const rect = el.getBoundingClientRect()
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
    })

    for (let i = 0; i < points.length; i++) {
      const randIndex = Math.floor(Math.random() * points.length)
      if (randIndex !== i && Math.random() > 0.5) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
        line.setAttribute('x1', points[i].x)
        line.setAttribute('y1', points[i].y)
        line.setAttribute('x2', points[randIndex].x)
        line.setAttribute('y2', points[randIndex].y)
        line.setAttribute('stroke', '#00ffff')
        line.setAttribute('stroke-width', '1')
        line.setAttribute('opacity', '0.3')
        svg?.appendChild(line)
      }
    }
  }, [])

  const handleStarHover = (index, isHovering) => {
    const star = starsRef.current[index]
    if (!star) return

    gsap.to(star, {
      scale: isHovering ? 1.2 : 1,
      boxShadow: isHovering ? '0 0 30px #00ffff' : '0 0 10px #00ffff',
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <section ref={containerRef} className="portfolio cosmic-zone">
      <div className="zone-header">
        <h2>Constellation of Works</h2>
      </div>

      <svg className="constellation-lines"></svg>

      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => starsRef.current[index] = el}
            className="portfolio-star"
            onMouseEnter={() => handleStarHover(index, true)}
            onMouseLeave={() => handleStarHover(index, false)}
          >
            <div className="star-glow"></div>
            <div className="star-content">
              <h3>{project.title}</h3>
              <p>{project.category}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Portfolio