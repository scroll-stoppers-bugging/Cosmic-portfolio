import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import '../../styles/hero.css'

const Hero = ({ scrollProgress }) => {
  const containerRef = useRef()
  const titleRef = useRef()
  const subtitleRef = useRef()
  const ctaRef = useRef()

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      duration: 2,
      opacity: 0,
      blur: 10,
      y: 50,
      ease: 'power4.out'
    })
    .from(subtitleRef.current, {
      duration: 2,
      opacity: 0,
      y: 30,
      ease: 'power4.out'
    }, '-=1.5')
    .from(ctaRef.current, {
      duration: 1.5,
      opacity: 0,
      scale: 0.8,
      ease: 'power3.out'
    }, '-=1')
  }, [])

  return (
    <section ref={containerRef} className="hero">
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">
          Welcome to the<br />
          <span className="cosmic-glow">Cosmic Universe</span>
        </h1>
        
        <p ref={subtitleRef} className="hero-subtitle">
          A cinematic journey through digital space and boundless creativity
        </p>

        <button ref={ctaRef} className="hero-cta">
          Explore the Universe →
        </button>
      </div>

      <div className="hero-scroll-indicator">
        <div className="scroll-dot"></div>
        <p>Scroll to continue</p>
      </div>
    </section>
  )
}

export default Hero