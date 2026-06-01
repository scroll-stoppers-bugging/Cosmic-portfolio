import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import '../../styles/process.css'

gsap.registerPlugin(ScrollTrigger)

const Process = ({ scrollProgress }) => {
  const containerRef = useRef()
  const stepsRef = useRef([])

  const steps = [
    { number: '01', title: 'Discovery', description: 'Understanding vision and goals' },
    { number: '02', title: 'Strategy', description: 'Planning the digital journey' },
    { number: '03', title: 'Design', description: 'Crafting the visual narrative' },
    { number: '04', title: 'Development', description: 'Building the experience' },
    { number: '05', title: 'Launch', description: 'Releasing into the universe' }
  ]

  useEffect(() => {
    const stepsElements = stepsRef.current

    stepsElements.forEach((step, index) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: step,
          start: 'top center+=100',
          markers: false
        }
      })

      tl.from(step, {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(step.querySelector('.orbital-ring'), {
        rotation: 360,
        duration: 4,
        repeat: -1,
        ease: 'none'
      }, 0)
    })
  }, [])

  return (
    <section ref={containerRef} className="process cosmic-zone">
      <div className="zone-header">
        <h2>The Journey</h2>
      </div>

      <div className="process-timeline">
        {steps.map((step, index) => (
          <div key={step.number} ref={el => stepsRef.current[index] = el} className="process-step">
            <div className="step-visual">
              <div className="orbital-ring"></div>
              <div className="step-number">{step.number}</div>
            </div>
            <div className="step-content">
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Process