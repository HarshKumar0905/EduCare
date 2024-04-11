import React from "react";
import Logo1 from '../../../Assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../Assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../Assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../Assets/TimeLineLogo/Logo4.svg';
import timeLineImage from '../../../Assets/Images/TimelineImage.png';

const timeLine = [
    {
        index : 0,
        Logo : Logo1,
        heading : 'Leadership',
        description : 'Fully committed to the success company'
    },
    {
        index : 1,
        Logo : Logo2,
        heading : 'Responsibility',
        description : 'Students will always be our top priority'
    },
    {
        index : 2,
        Logo : Logo3,
        heading : 'Flexibility',
        description : 'The ability to switch is an important skill'
    },
    {
        index : 3,
        Logo : Logo4,
        heading : 'Solve the problem',
        description : 'Code your way to a solution'
    }
]

const TimeLineSection = () => {
    return(
        <div>
            <div className='flex gap-15 items-center mb-10'>
                <div className='flex flex-col w-[45%] gap-5'>
                    {
                        timeLine.map((element, index) => {
                            return(
                                <div key={index} className='flex gap-6 relative'>
                                    <div className='w-[50px] h-[50px] rounded-full flex justify-center items-center bg-white'>
                                        <img src={element.Logo}/>
                                    </div>
                                    <div>
                                        <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                        <p className='text-base'>{element.description}</p>
                                    </div>
                                    <div className={`${(element.index!==3) ? 'absolute text-richblack-300 left-[5%] top-[49px]' : 'text-pure-greys-5'}`}>|</div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='relative rounded-lg shadow-[10px_10px_20px_10px_#09a77b] translate-y-[-50%]
                sm:translate-y-[0%]'>
                    <img src={timeLineImage} className='rounded-lg'/>
                    <div className='absolute bg-caribbeangreen-700 sm:flex lg:flex lg:flex-row sm:flex-col text-white uppercase py-7
                    left-[50%] translate-x-[-50%] md:translate-y-[-50%] rounded-lg translate-y-[10%]'>
                        <div className='flex gap-5 items-center lg:border-r md:border-caribbeangreen-300 px-7'>
                            <p className='text-3xl font-bold'>10</p>
                            <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                        </div>
                        <div className="block lg:hidden text-center text-caribbeangreen-300">-----------------</div>
                        <div className='flex gap-5 items-center px-7'>
                            <p className='text-3xl font-bold'>250</p>
                            <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TimeLineSection;