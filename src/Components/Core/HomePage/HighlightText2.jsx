import React from "react";
import { useInView } from "react-intersection-observer";

const HighlightText2 = ({text}) => {
    const [refH, inViewH] = useInView();
    return(
        <span ref={refH} className={`font-bold bg-gradient-to-b from-[#FF512F] to-[#F09819]
        text-transparent bg-clip-text text-4xl
        ${inViewH ? 'animate-heading' : 'opacity-0'}`}>
            {" "}
            {text}
        </span>
    );
}

export default HighlightText2;