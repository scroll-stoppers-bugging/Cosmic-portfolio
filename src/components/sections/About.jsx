import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '../../styles/about.css'

gsap.registerPlugin(ScrollTrigger)

const About = ({ scrollProgress }) => {
  const containerRef = useRef()
  const panelsRef = useRef([])

  useEffect(() => {
    const panels = panelsRef.current

    panels.forEach((panel, index) => {
      gsap.fromTo(panel, 
        {
          opacity: 0,
          y: 100,
          rotationX: 45
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top center+=100',
            markers: false
          }
        }
      )
    })
  }, [])

  return (
    <section ref={containerRef} className="about cosmic-zone">
      <div className="zone-header">
        <h2>About This Universe</h2>
      </div>

      <div className="about-content">
        <div ref={el => panelsRef.current[0] = el} className="glass-panel">
          <h3>Creative Vision</h3>
          <p>
            We create digital experiences that transcend traditional design. 
            Our work exists at the intersection of art, technology, and emotion.
          </p>
        </div>

        <div ref={el => panelsRef.current[1] = el} className="glass-panel">
          <h3>Immersive Technology</h3>
          <p>
            Leveraging Three.js, WebGL, and advanced animation techniques 
            to build experiences that feel alive and responsive.
          </p>
        </div>

        <div ref={el => panelsRef.current[2] = el} className="glass-panel">
          <h3>Premium Execution</h3>
          <p>
            Every pixel, every transition, every interaction is crafted 
            with meticulous attention to detail and performance.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About