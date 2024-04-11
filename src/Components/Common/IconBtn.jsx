import React from "react";

const IconBtn = ({
    text,
    onClick,
    children,
    outline=false,
    customClasses,
    type,
    disabled
}) => {
    return(
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            className={`flex items-center  ${
                outline ? "border border-[#00b0f0] bg-transparent text-[#00b0f0]" : "bg-[#00b0f0] text-richblack-900"
            } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold ${customClasses}
            hover:scale-95 transition-all duration-200 justify-center`}
        >
        {
            children ? (
                <>
                    <span>
                        {text}
                    </span>
                    {children}
                </>
            ) : (
                text
            )
        }
        </button>
    );
}

export default IconBtn;