import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";

const Services = ({ data }) => {
  console.log(data);
  return (
    <section id="services" className="container mx-auto">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold ">Our Services</h1>
        <p className="text-gray-800 max-w-3xl mt-2 text-center">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad minima et
          vitae ipsam quibusdam corporis nulla soluta veritatis excepturi?
          Neque, odio soluta!
        </p>
      </div>
      <div className=" text-white">
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
              slidesPerView: 1,
              spaceBetween: 25,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 35,
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data?.map((item, index) => {
            return (
              <>
                <SwiperSlide>
                  <CardContainer className="inter-var">
                    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1]  h-auto rounded-xl p-6 border  ">
                      <CardItem
                        translateZ="50"
                        className="text-xl font-bold text-neutral-600 dark:text-white"
                      >
                        {item.title}
                      </CardItem>
                      
                      <CardItem translateZ="100" className="w-full mt-4">
                        <img
                          src={`https://aayan.samadhaangroups.co.in/${item.image}`}
                          height="1000"
                          width="1000"
                          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                          alt="thumbnail"
                        />
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </SwiperSlide>
              </>
            );
          })}

          <div className="flex w-full  justify-between absolute top-[40%] z-50  gap-4 ">
            <div className="swiper-button-prev btn cursor-pointer">left</div>
            <div className="swiper-button-next btn cursor-pointer">right</div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Services;
