import React, { useEffect, useState } from 'react'
import RatingStars from '../../Common/RatingStars'
import GetAvgRating from "../../../Utils/AverageRating";
import { Link } from 'react-router-dom';

const Course_Card = ({course, Height}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(()=> {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    },[course]);

  return (
    <div>
        <Link to={`/courses/${course?._id}`}>
            <div>
                <div className="rounded-lg mb-5 w-[90%] sm:w-full lg:w-[90%]">
                    <img 
                        src={course?.thumbnail}
                        alt='course ka thumbnail'
                        className={`${Height} rounded-xl`}
                    />
                </div>
                <div className="flex flex-col gap-2 px-1 py-3">
                    <p className="text-xl text-richblack-5">{course?.courseName}</p>
                    <p className="text-sm text-richblack-50"><span className='font-bold'>INSTRUCTOR :</span>{" "}
                        {course?.instructor?.firstName}{" "}{course?.instructor?.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[#00b0f0]">{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount} />
                        <span className="text-richblack-400">{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p className="text-xl text-richblack-5">{course?.price}</p>
                </div>
            </div>
        </Link>

      
    </div>
  )
}

export default Course_Card;
