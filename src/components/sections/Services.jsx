import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/services.css'

const Services = ({ scrollProgress }) => {
  const [activeService, setActiveService] = useState(null)
  const cardsRef = useRef([])

  const services = [
    {
      id: 'design',
      title: 'Creative Design',
      description: 'Visionary design experiences that captivate and inspire',
      color: '#8b00ff',
      icon: '🎨'
    },
    {
      id: 'development',
      title: 'Advanced Development',
      description: 'Cutting-edge technology and optimized performance',
      color: '#0066ff',
      icon: '⚡'
    },
    {
      id: 'branding',
      title: 'Brand Identity',
      description: 'Distinctive visual language and narrative strategy',
      color: '#ffaa00',
      icon: '✨'
    }
  ]

  const handleCardHover = (index, isHovering) => {
    const card = cardsRef.current[index]
    if (!card) return

    gsap.to(card, {
      scale: isHovering ? 1.1 : 1,
      boxShadow: isHovering 
        ? `0 0 40px ${services[index].color}` 
        : `0 0 20px rgba(0, 255, 255, 0.3)`,
      duration: 0.3,
      ease: 'power2.out'
    })
  }

  return (
    <section className="services cosmic-zone">
      <div className="zone-header">
        <h2>Our Cosmic Services</h2>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={service.id}
            ref={el => cardsRef.current[index] = el}
            className="service-card"
            style={{ borderColor: service.color }}
            onMouseEnter={() => handleCardHover(index, true)}
            onMouseLeave={() => handleCardHover(index, false)}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 style={{ color: service.color }}>{service.title}</h3>
            <p>{service.description}</p>
            <button className="service-btn" style={{ borderColor: service.color }}>
              Learn More
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services