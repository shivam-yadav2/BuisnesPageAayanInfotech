import React from 'react'

const NavBar = () => {
    return (
        <div className='fixed top-0 left-0 w-full z-50'>

            <div className='container mx-auto p-1'>
                <div className='grid grid-cols-5 bg-white shadow-2xl px-6 text-black p-3 rounded-full'>
                    <div>
                        <img className='h-[50px]' src="https://aayaninfotech.com/wp-content/uploads/2025/02/screenshot-2025-01-02-115007.png" alt="" />
                    </div>
                    <div className="col-span-4 flex justify-end items-center">
                        <div className='flex justify-end gap-9 w-full'>
                            <a className='text-lg cursor-pointer font-semibold' href="">
                                Home
                            </a>
                            <a className='text-lg cursor-pointer font-semibold' href="">
                                About
                            </a>
                            <a className='text-lg cursor-pointer font-semibold' href="">
                                Services
                            </a>
                            <a className='text-lg cursor-pointer font-semibold' href="">
                                Testimonial
                            </a>
                            <a className='text-lg cursor-pointer font-semibold' href="">
                                Contact
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar