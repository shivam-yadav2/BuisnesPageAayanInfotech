import React from 'react'

const About = ({data}) => {
  console.log(data)
  return (
      <section id='about' >
          <div className="container py-12 mx-auto">
              <div className='flex flex-col justify-center items-center mb-8'>
                  <h1 className='text-4xl font-bold '>About Aayan Infotech</h1>
                  <p className='text-gray-800 max-w-3xl mt-2 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minima et vitae ipsam quibusdam corporis nulla soluta veritatis excepturi? Neque, odio soluta!</p>
              </div>
              <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: data?.content }}
            ></div>
        </div>
          
    </section>
  )
}

export default About