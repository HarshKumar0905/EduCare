import React from "react";
import { useDispatch, useSelector } from "react-redux";
import GetAvgRating from "../../../../Utils/AverageRating";
import { FaStar } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";
import {RiDeleteBin6Line} from "react-icons/ri";
import { removeFromCart } from "../../../../Slices/CartSlice";

const RenderCartCourses = () => {
    const {cart} = useSelector((state) => state.Cart);
    const dispatch = useDispatch();
    const getRating = (course) => {
        const count = GetAvgRating(course?.ratingAndReviews);
        return count;
    }

    return(
        <div className="flex flex-1 flex-col">
        {
            cart.map((course, index) => (
                <div className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                } ${index !== 0 && "mt-6"}`}>
                    <div className="flex flex-1 flex-col gap-4 xl:flex-row">
                        <img src={course?.thumbnail}
                        className="h-[148px] w-[220px] rounded-lg object-cover"
                        />

                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">
                                {course?.courseName}
                            </p>
                            <p className="text-sm text-richblack-300">
                                {course?.category?.name}
                            </p>
                            <div className="flex items-center gap-2">
                                {console.log("Course Details : ", course)}
                                <span className="text-yellow-5">
                                    {getRating(course)}
                                </span>
                                <ReactStars
                                count={5}
                                value={getRating(course)}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                                />
                                <span className="text-richblack-400">
                                    {course?.ratingAndReviews?.length} Reviews Made
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                        <button
                        onClick={() => dispatch(removeFromCart(course._id))}
                        className="flex items-center gap-x-1 rounded-md border
                        border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200
                        transition-all duration-200 hover:scale-95">
                            <RiDeleteBin6Line />
                            <span>Remove</span>
                        </button>
                        <p className="mb-6 text-3xl font-medium text-yellow-100">
                            ₹ {course?.price}
                        </p>
                    </div>
                </div>
            ))
        }
        </div>
    );
}

export default RenderCartCourses;