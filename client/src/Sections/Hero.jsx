import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Hero = ({data}) => {
    console.log(data)
  return (
      <div className=' pt-[100px] overflow-hidden  text-white'>
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
            {
                data?.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img className='w-full object-contain' src={`https://aayan.samadhaangroups.co.in/${item.image}`} alt="" />
                    </SwiperSlide>
                ))
            }
              
              
           

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