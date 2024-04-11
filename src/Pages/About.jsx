import React from "react";
import HighlightText1 from "../Components/Core/HomePage/HighlightText1";
import HighlightText2 from "../Components/Core/HomePage/HighlightText2";
import HighlightText3 from "../Components/Core/HomePage/HighlightText3";
import HighlightText4 from "../Components/Core/HomePage/HighlightText4";
import BannerImage1 from "../Assets/Images/aboutus1.webp";
import BannerImage2 from "../Assets/Images/aboutus2.webp";
import BannerImage3 from "../Assets/Images/aboutus3.webp";
import FoundingStory from "../Assets/Images/FoundingStory.png"
import StatsComponent from "../Components/Core/AboutPage/StatsComponent";
import Footer from "../Components/Common/Footer";
import LearningGrid from "../Components/Core/AboutPage/LearningGrid";
import { useInView } from "react-intersection-observer";
import ContactUsFormSection from "../Components/Core/AboutPage/ContactUsFormSection";

const About = () => {
    const [refH1, inViewH1] = useInView();
    const [refH2, inViewH2] = useInView();

    return(
        <div>
            {/* Section I */}
            <section className='bg-richblack-700'>
                <div className='z-0 mx-auto flex w-11/12 max-w-maxContent flex-col justify-between text-center text-white'>
                    <header className='mx-auto pt-20 text-4xl font-semibold lg:w-[70%]'>
                        <div ref={refH1} className={`${inViewH1 ? 'animate-heading' : 'opacity-0'}`}>Driving Innovation in Online Education for a
                        <HighlightText1 text={'Brighter Future'}/></div>
                        <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>
                            EduCare is at the forefront of driving innovation 
                            in online education. We're passionate about creating a 
                            brighter future by offering cutting-edge courses, leveraging 
                            emerging technologies, and nurturing a vibrant learning community.
                        </p>
                    </header>
                    <div className='relative top-[-10px] left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                        <img src={BannerImage1} className="rounded-lg shadow-[0px_0px_10px_8px_#805AD5] "/>
                        <img src={BannerImage2} className="rounded-lg shadow-[0px_0px_10px_8px_#805AD5]"/>
                        <img src={BannerImage3} className="rounded-lg shadow-[0px_0px_10px_8px_#805AD5]"/>
                    </div>
                </div>
            </section>

            {/* Section II */}
            <section className='border-b border-richblack-700'>
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
                    <div className="h-[100px] "></div>
                    <div ref={refH2} className={`text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white
                    ${inViewH2 ? 'animate-heading' : 'opacity-0'}`}>
                    We are passionate about revolutionizing the way we learn. Our innovative platform
                    <HighlightText1 text={'combines technology'}/>,<HighlightText2 text={'expertise'}/>{' '}
                    and community to create an <HighlightText3 text={'unparalleled educational experience'}/>.
                    </div>
                </div>
            </section>

            {/* Section III */}
            <section className="setBackground">
                <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>

                    <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                        <div className='my-24 flex lg:w-[50%] flex-col gap-10'>
                            <HighlightText4 text={'Our Founding Story'}/>
                            <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                                Our e-learning platform was born out of a shared vision and passion for transforming
                                education. It all began with a group of educators, technologists, and lifelong learners
                                who recognized the need for accessible, flexible, and high-quality learning opportunities
                                in a rapidly evolving digital world.
                            </p>
                            <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                                As experienced educators ourselves, we witnessed firsthand the limitations and challenges
                                of traditional education systems. We believed that education should not be confined to the
                                walls of a classroom or restricted by geographical boundaries. We envisioned a platform that 
                                could bridge these gaps and empower individuals from all walks of life to unlock their full 
                                potential.
                            </p>
                        </div>
                        <div className="lg:mt-20 mt-0">
                            <img className='shadow-[0_0_10px_8px] shadow-[#FC6767] rounded-lg'  src={FoundingStory} />
                            <div className="flex flex-col translate-x-[25%] mt-4">
                                <p className="text-3xl font-bold text-richblack-25">Harsh Kumar</p>
                                <p className="translate-x-[5%] font-bold text-richblack-25 italic">Founder - EduCare</p>
                            </div> 
                        </div>
                    </div>

                    <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                        <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                            <HighlightText2 text={'Our Vision'}/>
                            <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                                With this vision in mind, we set out on a journey to create an e-learning platform that would
                                revolutionize the way people learn. Our team of dedicated experts worked tirelessly to 
                                develop a robust and intuitive platform that combines cutting-edge technology with engaging 
                                content, fostering a dynamic and interactive learning experience.
                            </p>
                        </div>
                        <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                            <HighlightText1 text={'Our Mission'}/>
                            <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                            Our mission goes beyond just delivering courses online. We wanted to create a vibrant community 
                            of learners, where individuals can connect, collaborate, and learn from one another. We believe 
                            that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of 
                            collaboration through forums, live sessions, and networking opportunities.
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Section IV */}
            <StatsComponent/>

            {/* Section V */}
            <section className='mx-auto mt-20 flex w-full flex-col justify-between gap-10 text-white'>
                <LearningGrid/>
                <ContactUsFormSection/>
            </section>

            <Footer/>
        </div>
    );
}

export default About;