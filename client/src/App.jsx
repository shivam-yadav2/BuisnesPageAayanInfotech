import React from 'react'
import NavBar from './Sections/NavBar'
import About from './Sections/About'
import Services from './Sections/Services'
import Testimonial from './Sections/Testimonial'
import ContactForm from './Sections/ContactForm'
import Footer from './Sections/Footer'
import Hero from './Sections/Hero'
import './App.css'

const App = () => {
  return (
    <div className=' h-full'>
      <NavBar />
      <Hero/>
      <About/>
      <Services/>
      <Testimonial/>
      <ContactForm/>
      <Footer/>
    </div>
  )
}

export default App