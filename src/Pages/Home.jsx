import React from "react";
import {FaArrowRight} from 'react-icons/fa';
import { Link } from "react-router-dom";
import HighlightText1 from "../Components/Core/HomePage/HighlightText1";
import HighlightText2 from "../Components/Core/HomePage/HighlightText2";
import CTAButton from "../Components/Core/HomePage/CTAButton";
import Banner from '../Assets/Images/banner.mp4';
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import Footer from "../Components/Common/Footer";
import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/Core/HomePage/InstructorSection";
import ExploreMore from "../Components/Core/HomePage/ExploreMore";
import { useInView } from "react-intersection-observer";
import ReviewSlider from "../Components/Common/ReviewSlider";

const Home = () => {
    const [refH1, inViewH1] = useInView();
    const [refH2, inViewH2] = useInView();
    const [refH3, inViewH3] = useInView();
    const [refH4, inViewH4] = useInView();
    const [refH5, inViewH5] = useInView();
    return(
        <div>
            {/* Section I */}
            <div className="mx-auto flex flex-col items-center
            text-white justify-between setBackground z-10">
                <Link to={'/signup'}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold
                    transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>
                <div ref={refH1} className={`text-center text-4xl font-semibold mt-7
                ${inViewH1 ? 'animate-heading' : 'opacity-0'}`}>
                    Uplift Your Career With  
                    <HighlightText1 text={'Coding Skills'}/>
                </div>
                <div className='mt-4 w-[90%] text-center text-lg font-bold 
                text-richblack-300 max-w-maxContent'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, 
                    and get access to a wealth of resources, including hands-on projects, quizzes, and 
                    personalized feedback from instructors.
                </div>
                <div className='flex gap-7 mt-8'>
                    <CTAButton active={true} linkTo={'/signup'}>Learn More</CTAButton>
                    <CTAButton active={false} linkTo={'/login'}>Book a Demo</CTAButton>
                </div>
                <div className='shadow-blue-200 mx-3 my-14 shadow-[30px_-5px_70px_-5px] rounded-md w-[70%]'>
                    <video className='shadow-[20px_20px_rgba(255,255,255)] rounded-md'
                    muted loop autoPlay>
                        <source  src={Banner} type='video/mp4'/>
                    </video>
                </div>

                <div className="w-11/12">
                    <CodeBlocks
                    heading={<div ref={refH2} className={`text-4xl font-semibold ${inViewH2 ? 'animate-heading' : 'opacity-0'}`}>
                                Unlock Your 
                                <HighlightText1 text={'coding potentials'}/> {' '}
                                with our online courses
                            </div>}
                    subHeading={<div className='pl-4'>
                        Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.</div>}
                    CTABtn1={{
                        text : 'Try it yourself',
                        linkTo : '/signup',
                        active : true
                    }}
                    CTABtn2={{
                        text : 'Learn More',
                        linkTo : '/login',
                        active : false
                    }}
                    codeBlock={
                        `<<!DOCTYPE html>
                        <html>
                        <head><title>Example</title>
                        </head>
                        <body>
                        <h1><a href="/">Header</a>
                        </h1>
                        <nav><a href="one/">One</a>\t
                        <a href="two/">Two</a>
                        <a href="three/">Three</a>
                        </nav>`}
                    codeColor={'text-[#f3e2f0]'}
                    backgroundGradient={true}
                    />
                </div>

                <div className="w-11/12">
                    <CodeBlocks
                    heading={<div ref={refH3} className={`text-4xl font-semibold ${inViewH3 ? 'animate-heading' : 'opacity-0'}`}>
                                Start
                                <HighlightText2 text={'coding in seconds'}/> {' '}
                            </div>}
                    subHeading={<div className='pl-4'>
                        Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.</div>}
                    CTABtn1={{
                        text : 'Continue Lesson',
                        linkTo : '/signup',
                        active : true
                    }}
                    CTABtn2={{
                        text : 'Learn More',
                        linkTo : '/login',
                        active : false
                    }}
                    codeBlock={
                        `<<!DOCTYPE html>
                        <html>
                        <head><title>Example</title>
                        </head>
                        <body>
                        <h1><a href="/">Header</a>
                        </h1>
                        <nav><a href="one/">One</a>\t
                        <a href="two/">Two</a>
                        <a href="three/">Three</a>
                        </nav>`}
                    codeColor={'text-[#f3e2f0]'}
                    backgroundGradient={false}
                    />
                </div>

                <ExploreMore/>
            </div>

            {/* Section II */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                <div className='homepage_bg h-[333px] flex'>
                    <div className='w-11/12 max-w-maxContent flex items-center gap-5 mx-auto'>
                        <div className='flex gap-7 text-white mx-auto mt-36 relative z-10'>
                            <CTAButton active={true} linkTo={'/signup'}>
                                <div className='flex gap-2 items-center'>
                                    Explore Full Catalogue
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo={'/signup'}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                </div>  

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col 
                items-center justify-between gap-7">
                    <div className='flex gap-5 justify-center mb-10 mt-8'>
                        <div ref={refH4} className={`text-4xl font-semibold w-[45%] ${inViewH4 ? 'animate-heading' : 'opacity-0'}`}>
                            Get the Skills you need for a
                            <HighlightText1 text={'Job that is in demand'}/>
                        </div>
                        <div className='flex flex-col gap-10 w-[40%] items-start'>
                            <p className='text-[16px]'>
                                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </p>
                            <CTAButton active={true} linkTo={'/signup'}>
                                Learn More
                            </CTAButton>
                        </div>
                    </div>
                    <TimeLineSection/>
                    <LearningLanguageSection/>
                </div>
            </div>

            {/* Section III */}
            <div className='setBackgroundsh mx-auto flex flex-col items-center text-white'>
                <InstructorSection/>

                <h2 ref={refH5} className={`text-center text-4xl mt-14 font-semibold
                ${inViewH5 ? 'animate-heading' : 'opacity-0'}`}>
                    Review From Other Learners
                </h2>
                <ReviewSlider/>
            </div>

            <Footer/>
        </div>
    );
}

export default Home;