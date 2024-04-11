import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import IconBtn from "../../../Common/IconBtn";
import { buyCourse } from "../../../../Services/Operations/studentFeaturesAPI";

const RenderTotalAmount = () => {
    const {total, cart} = useSelector((state) => state.Cart);
    const {token} = useSelector((state) => state.Auth);
    const {user} = useSelector((state) => state.Profile);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        console.log("Bought courses : ", courses);
        buyCourse(token, courses, user, navigate, dispatch);
    }
    return(
        <div className="min-w-[280px] rounded-md border-[1px] 
        border-richblack-700 bg-richblack-800 p-6">
            <p className="mb-1 text-sm font-medium text-richblack-300">
                Total : 
            </p>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
                ₹ {total}
            </p>
            <IconBtn
                text="Buy Now"
                customClasses="w-full justify-center"
                onClick={handleBuyCourse}
            />
        </div>
    );
}

export default RenderTotalAmount;