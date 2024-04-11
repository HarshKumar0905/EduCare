import React from "react";
import { useInView } from "react-intersection-observer";

const HighlightText1 = ({text}) => {
    const [refH, inViewH] = useInView();
    return(
        <span ref={refH} className={`font-bold bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]
        text-transparent bg-clip-text text-4xl
        ${inViewH ? 'animate-heading' : 'opacity-0'}`}>
            {" "}
            {text}
        </span>
    );
}

export default HighlightText1;