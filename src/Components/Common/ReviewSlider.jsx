import React, {useState, useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {FreeMode, Pagination, Autoplay} from "swiper/modules";
import RatingStars from './RatingStars';
import { APIConnector } from "../../Services/APIConnector"
import { ratingsEndpoints } from "../../Services/API";
import { useInView } from "react-intersection-observer";

const ReviewSlider = () => {
    const [refH, inViewH] = useInView();
    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;
    const pagination = {
        clickable: true
    };
    useEffect(() => {
        const fetchAllReviews = async () => {
            const {data} = await APIConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
            if(data?.success){
                setReviews(data?.data);
            }
        }
        fetchAllReviews();
    }, []);

    return(
        <div className="text-white">
            <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={25}
                  loop={true}
                  pagination={pagination}
                  modules={[FreeMode, Pagination, Autoplay]}
                  autoplay={{
                    delay : 2500,
                    disableOnInteraction : false
                  }}
                className="max-h-[30rem] mySwiper relative w-full">
                {
                    reviews.map((review) => (
                        <SwiperSlide>
                        <div className="flex flex-col gap-3 rounded-lg min-h-[200px] lg:min-h-[150px] mb-[34px]
                        bg-richblack-800 p-3 text-[14px] text-richblack-25">
                            <div className="flex items-center gap-4">
                                <img
                                  src={review?.user?.image || 
                                  `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                  alt="Image Not Found"
                                  className="h-9 w-9 rounded-full object-cover"
                                />
                                <div className="flex flex-col">
                                    <h1 className="font-semibold text-richblack-5">
                                      {`${review?.user?.firstName} ${review?.user?.lastName}`}
                                    </h1>
                                    <h2 className="text-[12px] font-medium text-richblack-500">
                                      {review?.course?.courseName}
                                    </h2>
                                </div>
                            </div>
                            <p className="font-medium text-richblack-25">
                            {
                              review?.review?.split(" ").length > truncateWords
                              ? `${review?.review
                              .split(" ")
                              .slice(0, truncateWords)
                              .join(" ")} ...`
                              : `${review?.review}`
                            }
                            </p>
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-[#00b0f0]">
                                    {review.rating.toFixed(1)}
                                </h3>
                                <RatingStars Review_Count={review.rating}/>
                            </div>
                        </div>
                        </SwiperSlide>
                    ))
                }
                <div ref={refH} className={`rounded-full absolute h-[20px] w-[250px]
                bg-richblack-400 top-[84.5%] left-[40.5%] hidden lg:block
                ${inViewH ? 'animate-button' : 'opacity-0'}`}></div>
                </Swiper>
            </div>
        </div>
    );
}

export default ReviewSlider;