import React from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {FreeMode, Pagination, Autoplay} from "swiper/modules";
import Course_Card from "./Course_Card";

const CourseSlider = ({Courses}) => {
    const pagination = {
        clickable: true
    };
    return(
        <div>
        {
            Courses?.length ? (
                <Swiper
                  slidesPerView={1}
                  spaceBetween={25}
                  loop={true}
                  pagination={pagination}
                  modules={[FreeMode, Pagination, Autoplay]}
                  breakpoints={{
                    1024: {
                    slidesPerView: 3,
                    }
                  }} 
                  autoplay={{
                    delay : 2500,
                    disableOnInteraction : false
                  }}
                className="max-h-[30rem] mySwiper relative">
                {
                    Courses?.map((course) => (
                        <SwiperSlide>
                            <Course_Card course={course}
                              Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))
                }
                    <div className="rounded-full absolute h-[20px] w-[100px]
                    bg-richblack-400 top-[93.2%] left-[46.1%] hidden md:block"></div>
                </Swiper>
            ) : (
                <p className="h-full flex justify-center items-center
                text-xl text-richblack-300 font-bold">
                    No Courses Found
                </p>
            )
        }
        </div>
    );
}

export default CourseSlider;