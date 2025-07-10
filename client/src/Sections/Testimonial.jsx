import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Testimonial = ({data}) => {
    return (
        <section id='testimonial' className='container mx-auto'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-bold '>Our Precious Feedback</h1>
                <p className='text-gray-800 max-w-3xl mt-2 text-center'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minima et vitae ipsam quibusdam corporis nulla soluta veritatis excepturi? Neque, odio soluta!</p>
            </div>
            <div className=' pt-[50px] text-white'>
                <Swiper
                    loop={true}
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    speed={2000}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper relative"
                    spaceBetween={10}
                    // centeredSlides={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        768: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 15,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 15,
                        },
                    }}
                    onSwiper={(swiper) => console.log(swiper)}
                >
                    {
                        data?.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="testimonial">
                                    <h3 className="title">{item.name}
                                        <span className="post">- {item.post}</span>
                                    </h3>
                                    <p className="description">
                                        {item.message}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    
                    


                    <div className="flex w-full  justify-between absolute top-[40%] z-50  gap-4 ">
                        <div className="swiper-button-prev btn cursor-pointer">
                            left
                        </div>
                        <div className="swiper-button-next btn cursor-pointer">
                            right
                        </div>
                    </div>
                </Swiper>
            </div>
        </section>
    )
}

export default Testimonial