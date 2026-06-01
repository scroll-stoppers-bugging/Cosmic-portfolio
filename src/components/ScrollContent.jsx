import React from 'react'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Portfolio from './sections/Portfolio'
import Process from './sections/Process'
import Contact from './sections/Contact'

const ScrollContent = ({ scrollProgress }) => {
  return (
    <div className="scroll-container">
      <Hero scrollProgress={scrollProgress} />
      <About scrollProgress={scrollProgress} />
      <Services scrollProgress={scrollProgress} />
      <Portfolio scrollProgress={scrollProgress} />
      <Process scrollProgress={scrollProgress} />
      <Contact scrollProgress={scrollProgress} />
    </div>
  )
}

export default ScrollContent