import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  return (
      <div className='h-screen overflow-hidden  text-white'>
          <Swiper
              loop={true}
              autoplay={{
                  delay: 5500,
                  disableOnInteraction: false,
              }}
              speed={2000}
            //   navigation={{
            //       nextEl: ".swiper-button-next",
            //       prevEl: ".swiper-button-prev",
            //   }}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper relative"
              spaceBetween={10}
              // centeredSlides={true}
              breakpoints={{
                  320: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                  },
                  768: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                  },
                  1024: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                  },
                  1200: {
                      slidesPerView: 1,
                      spaceBetween: 0,
                  },
              }}
              onSwiper={(swiper) => console.log(swiper)}
          >
              <SwiperSlide>
                  <img className='w-full object-contain' src="https://images.unsplash.com/photo-1751013781844-fa6a78089e49?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                  <img className='w-full object-contain' src="https://images.unsplash.com/photo-1751013781844-fa6a78089e49?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                  <img className='w-full object-contain' src="https://images.unsplash.com/photo-1751013781844-fa6a78089e49?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </SwiperSlide>
              <SwiperSlide>
                  <img className='w-full object-contain' src="https://images.unsplash.com/photo-1751013781844-fa6a78089e49?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </SwiperSlide>
           

              {/* <div className="flex w-full  justify-between absolute top-[40%] z-50  gap-4 ">
                  <div className="swiper-button-prev btn cursor-pointer">
                      left
                  </div>
                  <div className="swiper-button-next btn cursor-pointer">
                      right
                  </div>
              </div> */}
          </Swiper>
    </div>
  )
}

export default Hero