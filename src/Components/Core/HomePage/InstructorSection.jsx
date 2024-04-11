import React from "react";
import Instructor from '../../../Assets/Images/Instructor.png';
import HighlightText2 from "./HighlightText2";
import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

const InstructorSection = () => {
    const [refH, inViewH] = useInView();
    return(
        <div className='lg:my-16 mt-10 sm:mb-32 md:mb-44 w-[90%]'>
            <div className='flex gap-20 items-center'>
                <div className='relative w-[50%] rounded-lg shadow-[-10px_-10px_20px_10px_#0e7a9e] translate-y-[-60%]
                sm:translate-y-[0%] translate-x-5 md:translate-x-0'>
                    <img src={Instructor} className='rounded-lg'/>
                    <div className='absolute bg-blue-700 sm:flex lg:flex lg:flex-row sm:flex-col text-white uppercase py-7
                    left-[50%] translate-x-[-50%] lg:translate-y-[-50%] rounded-lg translate-y-[10%]'>
                        <div className='flex flex-row gap-5 items-center lg:border-r lg:border-blue-300 sm:px-7'>
                            <p className='text-3xl font-bold'>24/7</p>
                            <p className='text-blue-300 text-sm'>Teach according to your comfort</p>
                        </div>
                        <div className="block lg:hidden text-center text-blue-300">-----------------</div>
                        <div className='flex flex-row gap-5 items-center sm:px-7'>
                            <p className='text-3xl font-bold'>10K+</p>
                            <p className='text-blue-300 text-sm'>Instructor Family</p>
                        </div>
                    </div>
                </div>
                <div className='w-[50%] flex flex-col gap-10'>
                    <div ref={refH} className={`text-4xl font-semibold text-white w-[50%] ${inViewH ? 'animate-heading' : 'opacity-0'}`}>
                        Become an
                        <HighlightText2 text={'Instructor'}/>
                    </div>
                    <p className='font-medium text-[16px] w-[82%] text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion.
                        We provide the tools and skills to teach what you love.
                    </p>
                    <div className='w-fit'>
                    <CTAButton active={true} linkTo={'/signup'}>
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InstructorSection;