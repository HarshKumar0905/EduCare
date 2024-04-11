import React from "react";
import HighlightText1 from "./HighlightText1";
import KnowYourProgress from '../../../Assets/Images/Know_your_progress.png';
import CompareWithOthers from '../../../Assets/Images/Compare_with_others.png';
import PlanYourLessons from '../../../Assets/Images/Plan_your_lessons.png';
import CTAButton from "./CTAButton";
import { useInView } from "react-intersection-observer";

const LearningLanguageSection = () => {
    const [refH, inViewH] = useInView();
    return(
        <div className='mt-20'>
            <div className='flex flex-col gap-5 mb-16'>
                <div ref={refH} className={`font-semibold text-4xl text-center ${inViewH ? 'animate-heading' : 'opacity-0'}`}>
                    Your swiss knife for
                    <HighlightText1 text={'learning any language'}/>
                </div>
                <div className='text-center text-richblack-600 mx-auto text-base w-[80%]'>
                  Using spin making learning multiple languages easy. with 20+
                  languages realistic voice-over, progress tracking, custom 
                  schedule and more.
                </div>
                <div className='flex items-center justify-center mt-5'>
                    <img 
                        src={KnowYourProgress}
                        className='object-contain -mr-32'
                        
                    />
                    <img 
                        src={CompareWithOthers}
                        className='object-contain'
                       
                    />
                    <img 
                        src={PlanYourLessons}
                        className='object-contain -ml-36'
                        
                    />
                </div>
                <div className='w-fit mx-auto'>
                    <CTAButton active={true} linkTo={'/signup'}>
                        Learn More
                    </CTAButton>
                </div>
            </div>
        </div>
    );
}

export default LearningLanguageSection;