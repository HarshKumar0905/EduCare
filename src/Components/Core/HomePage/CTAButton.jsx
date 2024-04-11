import React from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const CTAButton = ({children, active, linkTo}) => {
    const [ref, inView] = useInView();
    return(
        <Link to={linkTo} ref={ref}>
            <div className={`group text-center text-[15px] p-1 rounded-md font-bold
            ${active ? 'bg-[#00b0f0] text-black' : 'bg-richblack-800'}
            ${inView ? 'animate-button' : 'opacity-0'} hover:scale-95 transition-all duration-200`}>
                <div className={`flex items-center gap-2 rounded-md px-5 py-2
                        transition-all duration-200 
                        ${active ? 'group-hover:bg-white' : 'group-hover:bg-richblack-900'}`}>
                        {children}
                </div>
            </div>
        </Link>
    );
}

export default CTAButton;