import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { json, useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { ACCOUNT_TYPE } from '../../../Utils/Constants';
import { addtoCart } from '../../../Slices/CartSlice';
import { BiSolidRightArrow } from 'react-icons/bi';
import IconBtn from '../../Common/IconBtn';
import { BiShareAlt } from "react-icons/bi";

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {
    const {cart} = useSelector((state) => state.Cart)
    const {user} = useSelector((state)=>state.Profile);
    const {token} = useSelector((state)=>state.Auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        thumbnail : ThumbnailImage,
        price : CurrentPrice,

    } = course;
    
    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("Instructor cannot buy the course");
            return;
        }
        if(token){
            dispatch(addtoCart(course));
            return;
        }
        setConfirmationModal({
            text1 : "You are not Logged In !!",
            text2 : "Please login to add to cart",
            btn1Text : "Login",
            btn2Text : "Cancel",
            btn1Handler:()=>navigate("/login"),
            btn2Handler: ()=> setConfirmationModal(null),
        })
    }
    
    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }

    return (
        <div className='flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 border-[2px]
        border-richblack-400'>
        <img 
            src={ThumbnailImage}
            alt='Thumbnail Image'
            className='max-h-[300px] min-h-[180px] w-[400px] overflow-hidden rounded-2xl object-cover md:max-w-full'
        />
        <div className='px-4'>
        <div className='space-x-3 pb-4 text-3xl font-semibold'>
            Rs. {CurrentPrice}
        </div>
        <div className='flex flex-col gap-y-6'>
            <IconBtn text={`${user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course ": "Buy Now"}`}
                onClick={
                    user && course?.studentsEnrolled.includes(user?._id)
                    ? ()=> navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                }
            />
        {
            (!course?.studentsEnrolled.includes(user?._id)) && (
                <button onClick={handleAddToCart} className="transition-all 
                duration-200 flex justify-center items-center rounded-md 
                py-2 px-5 font-semibold bg-richblack-800 hover:scale-95">
                    Add to Cart
                </button>
            )
        }
        </div>

        <div>
            <p className='pb-3 pt-6 text-center text-sm text-richblack-25'>
                30-Day Money-Back Guarantee
            </p> 
        </div>
        <div>
            <p className='my-2 text-xl font-semibold '>
                This Course Includes :-
            </p>
            <div className='flex flex-col gap-3 text-sm text-caribbeangreen-100'>
                {
                    JSON.parse(course?.instructions).map((item, index)=> (
                        <p key={index} className='flex gap-2 items-center'>
                           <BiSolidRightArrow/>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>
        <div className='text-center'>
            <button
            className='mx-auto flex items-center gap-2 text-[#00b0f0] bg-black py-2 px-8
            rounded-md transition-all duration-200 hover:scale-95 font-bold'
            onClick={handleShare}
            >
                <BiShareAlt/>
                Share
            </button>
        </div>
        </div>
    </div>
  )
}

export default CourseDetailsCard;