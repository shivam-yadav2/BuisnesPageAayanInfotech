import React, { useState } from 'react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='fixed top-0 left-0 w-full z-50'>
      <div className='container mx-auto p-1'>
        <div className='grid grid-cols-5 bg-white shadow-2xl px-6 text-black p-3 rounded-full md:items-center'>
          <div className='flex items-center'>
            <img 
              className='h-[50px]' 
              src="https://aayaninfotech.com/wp-content/uploads/2025/02/screenshot-2025-01-02-115007.png" 
              alt="Logo" 
            />
          </div>
          <div className="col-span-4 flex justify-end items-center">
            
            <button 
              className='md:hidden text-2xl focus:outline-none' 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>

            
            <div className='hidden md:flex justify-end gap-9 w-full'>
              <a className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' href="#">
                Home
              </a>
              <a className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' href="#about">
                About
              </a>
              <a className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' href="#services">
                Services
              </a>
              <a className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' href="#testimonial">
                Testimonial
              </a>
              <a className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' href="#contact">
                Contact
              </a>
            </div>
          </div>
        </div>

        
        <div 
          className={`md:hidden bg-white shadow-2xl rounded-b-2xl transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className='flex flex-col items-center gap-4 py-4'>
            <a 
              className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' 
              href="#"
              onClick={toggleMenu}
            >
              Home
            </a>
            <a 
              className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' 
              href="#about"
              onClick={toggleMenu}
            >
              About
            </a>
            <a 
              className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' 
              href="#services"
              onClick={toggleMenu}
            >
              Services
            </a>
            <a 
              className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' 
              href="#testimonial"
              onClick={toggleMenu}
            >
              Testimonial
            </a>
            <a 
              className='text-lg cursor-pointer font-semibold hover:text-blue-600 transition-colors' 
              href="#contact"
              onClick={toggleMenu}
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;