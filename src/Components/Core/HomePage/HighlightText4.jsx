import React from "react";
import { useInView } from "react-intersection-observer";

const HighlightText4 = ({text}) => {
    const [refH, inViewH] = useInView();
    return(
        <span ref={refH} className={`bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045]
        bg-clip-text font-semibold text-transparent text-4xl lg:w-[70%]
        ${inViewH ? 'animate-heading' : 'opacity-0'}`}>
            {" "}
            {text}
        </span>
    );
}

export default HighlightText4;