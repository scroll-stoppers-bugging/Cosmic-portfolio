import React, { useRef, useState } from 'react'
import gsap from 'gsap'
import '../../styles/contact.css'

const Contact = ({ scrollProgress }) => {
  const containerRef = useRef()
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.2,
      yoyo: true,
      repeat: 1
    })

    console.log('Form submitted:', formData)
    setFormData({ name: '', email: '', message: '' })
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <section ref={containerRef} className="contact cosmic-zone">
      <div className="zone-header">
        <h2>Reach Out Across the Universe</h2>
      </div>

      <div className="contact-container">
        <div className="orbit-station">
          <div className="rotating-ring"></div>
          
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            
            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleInputChange}
              required
            ></textarea>

            <button type="submit" className="submit-btn">
              Send Transmission →
            </button>
          </form>
        </div>

        <div className="contact-info">
          <div className="info-card">
            <h4>📍 Location</h4>
            <p>Floating in the digital cosmos</p>
          </div>
          
          <div className="info-card">
            <h4>📧 Email</h4>
            <p>hello@cosmic.studio</p>
          </div>
          
          <div className="info-card">
            <h4>🌐 Social</h4>
            <div className="social-links">
              <a href="#">Twitter</a>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact