import { useState } from "react";
import { useInView } from "react-intersection-observer";
import { React } from "react";
import {HomePageExplore} from '../../../Data/homepage-explore';
import HighlightText1 from "./HighlightText1";
import CourseCard from "./CourseCard";

const tabName = [
    'Free',
    'New to Coding',
    'Most Popular',
    'Skill Paths',
    'Career Paths'
]

const ExploreMore = () => {
    const [myRef, inView] = useInView();
    const [currentTab, setCurrentTab] = useState(HomePageExplore[0].tag);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }
    return(
        <div>
            <div ref={myRef} className='text-4xl font-semibold text-center md:justify-center
             flex gap-2 flex-col md:flex-row'>
                <div className={`${inView ? 'animate-heading' : 'opacity-0'}`}>Unlock the</div>
                <div className={`${inView ? 'animate-heading' : 'opacity-0'}`}><HighlightText1 text={'Power of Code'}/></div>
            </div>
            <p className='text-center text-richblack-300 text-lg font-bold mt-3 lg:mb-0'>
                Learn to build anything you can imagine
            </p>
            <div className='flex flex-row rounded-full bg-richblack-800
            mt-5 mb-8 px-1 py-1 gap-2 w-[75%] lg:w-full mx-auto md:justify-between'>
            {
                tabName.map((element, index) => {
                    return(
                        <div key={index}
                        className={`md:text-[16px] text-[12px] items-center justify-center flex text-center
                        ${currentTab === element ? 'bg-richblack-900 text-richblack-5 font-medium' : 
                        'text-richblack-200'} rounded-full transition-all duration-200 cursor-pointer
                        hover:bg-richblack-900 hover:text-richblack-5 px-1 md:py-2 md:px-5`}
                        onClick={() => setMyCards(element)}>
                            {element}
                        </div>
                    )
                })
            }
            </div>
            <div className='hidden lg:block lg:h-[200px] -z-10 relative'>
            </div>
            <div className='lg:absolute gap-10 item-center flex flex-col md:item-center
            lg:w-[85%] text-black justify-center lg:flex-row md:w-[77%] mx-auto
            mb-9 md:mb-16 lg:-translate-y-[50%] lg:-translate-x-[22%] lg:px-0'>
            {
                courses.map((element, index) => {
                    return(
                        <CourseCard
                        key={index}
                        cardData = {element}
                        currentCard = {currentCard}
                        clickHandler = {() => {
                            setCurrentCard(element.heading);
                        }}/>
                    )
                })
            }
            </div>
        </div>
    );
}

export default ExploreMore;