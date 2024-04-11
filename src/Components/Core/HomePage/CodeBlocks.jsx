import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";
import './Border.css';

const CodeBlocks = ({
    heading, subHeading, CTABtn1, CTABtn2, 
    codeBlock, backgroundGradient, codeColor
}) => {
    return (
        <div className='flex flex-col my-20 justify-between gap-10  md:flex-row'>
            <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
                {heading}
                <div className='text-richblack-300 font-bold text-lg w-[90%]'>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-[53px] pl-4'>
                    <CTAButton active={CTABtn1.active} linkTo={CTABtn1.linkTo}>
                        <div className='flex gap-2 items-center'>
                            {CTABtn1.text}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={CTABtn2.active} linkTo={CTABtn2.linkTo}>
                        {CTABtn2.text}
                    </CTAButton>
                </div>
            </div>

            <div className='h-fit flex flex-row py-3 
            code-border
            leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]'>
                <div className={`absolute ${backgroundGradient ? 'gradient-custom-1' : 'gradient-custom-2'}
                w-[373px] h-[257px] rounded-full blur-2xl opacity-20 -left-2 -top-2`}></div>
                <div className='text-center flex select-none flex-col w-[10%]
                text-richblack-400 font-inter font-bold text-[17px] gap-[0.38px]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 text-[17px] font-bold font-mono ${codeColor} pr-1`}>
                    <TypeAnimation sequence={[codeBlock, 200, '']} 
                    repeat={Infinity} cursor={true}
                    style={
                        {
                            whiteSpace : 'pre-line',
                            display : 'block'
                        }
                    }
                    omitDeletionAnimation={true}/>
                </div>
            </div>
        </div>
    );
}

export default CodeBlocks;