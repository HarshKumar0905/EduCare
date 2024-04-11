import React from "react";

const HighlightText3 = ({text}) => {
    return(
        <span className='font-bold bg-gradient-to-b from-[#E65C00] to-[#F9D423]
        text-transparent bg-clip-text'>
            {" "}
            {text}
        </span>
    );
}

export default HighlightText3;