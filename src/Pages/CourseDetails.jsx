import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { buyCourse } from '../Services/Operations/studentFeaturesAPI.jsx';
import { fetchCourseDetails } from '../Services/Operations/courseDetailsAPI.jsx';
import { setCourse } from '../Slices/CourseSlice.js';
import GetAvgRating from '../Utils/AverageRating.jsx';
import Error from "./Error.jsx"
import ConfirmationModal from "../Components/Common/ConfirmationModal.jsx"
import RatingStars from "../Components/Common/RatingStars.jsx"
import { formatDate } from '../Services/formatDate.jsx';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { BsGlobe } from 'react-icons/bs';
import { BiVideo } from 'react-icons/bi';
import { MdOutlineArrowForwardIos } from 'react-icons/md';
import CourseDetailsCard from '../Components/Core/Course/CourseDetailsCard';
import { toast } from 'react-hot-toast';
import Footer from '../Components/Common/Footer.jsx';
import convertSecondsToDuration from '../Utils/secToDurationFrontend.jsx';
import IconBtn from '../Components/Common/IconBtn.jsx';
import { addtoCart } from '../Slices/CartSlice.js';

const CourseDetails = () => {
    const {token} = useSelector((state)=> state.Auth);
    const {user} = useSelector((state) => state.Profile);
    const {loading} = useSelector((state) => state.Profile);
    const {cart} = useSelector((state) => state.Cart);
    const {courseId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [courseData, setCourseData] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
      const getCourseFullDetails = async () => {
        try {
            const result = await fetchCourseDetails(courseId);
            setCourseData(result);
        } catch (error) {
            toast.error("Could not get course")
            console.log("Could not fetch coursse details");
        }
      }

      getCourseFullDetails();
    }, [courseId])
    
    useEffect(() => {
      const count = GetAvgRating(courseData?.data?.ratingAndReviews);
      setAvgReviewCount(count);
    }, [courseData]);
    
    const [totalNoOfLectures, setTotalNoOfLectures] = useState(0);
    useEffect(() => {
      let lectures = 0;
        courseData?.data?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length || 0
    })
    setTotalNoOfLectures(lectures);
    }, [courseData])
    
    //Will store sectionIds for enabling the dropdown
    const [isActive, setIsActive] = useState([]);
    const handleActive = (id)=> {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e)=> e != id)
        )
    }

    const handleBuyCourse = () => {
        if(token){
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setConfirmationModal({
            text1:"You are not Logged In !!",
            text2:"Please login to purchase the course",
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:() => navigate("/login"),
            btn2Handler:()=>setConfirmationModal(null),
        });
    }

    if(loading || !courseData) {
        return (
            <div className="h-[calc(100vh-3.5rem)] flex justify-center items-center">
                <div className="spinner"></div>
            </div>
        )
    }

    if(!courseData.success) {
        return (
            <div>
                <Error />
            </div>
        )
    }

    const {
        courseName,
        courseDescription,
        thumbnail,
        price, 
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData?.data;
    function getDuration(courseContent)
    {
        let totalDurationInSeconds = 0
        courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds});
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
        return totalDuration;
    }
 
    return (
    <>
        {/* Details and Course Buy Card */}
        <div className='relative w-full bg-richblack-800'>
            <div className='mx-auto box-content px-4 lg:w-[1260px] 2xl:relative '>
                <div className='mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]'>
                   
                   <div className='relative block max-h-[30rem] lg:hidden'>
                        <div className='absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]'>
                        </div>
                        <img src={thumbnail} className='aspect-auto w-full'/>
                   </div>

                   <div className='z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5'>
                        <p className='text-4xl font-bold text-richblack-5 sm:text-[42px]'>{courseName}</p>
                        <p className='text-richblack-200'>{courseDescription}</p>
                        
                        <div className='text-md flex flex-wrap items-center gap-2'>
                            <span className='text-[#00b0f0]'>{avgReviewCount}</span>
                            <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                            <span>{`(${ratingAndReviews.length} reviews) `}</span>
                            <span>{`(${studentsEnrolled.length} students enrolled)`}</span>
                        </div>

                        <div>
                            <p>Created By {`${instructor.firstName}`}</p>
                        </div>

                        <div className='flex flex-wrap gap-5 text-lg'>
                            <p className='flex items-center gap-2'>
                            <i className=' text-white'><IoIosInformationCircleOutline/></i>
                                Created At {formatDate(createdAt)}
                            </p>
                            <p className='flex items-center gap-2'>
                            <BsGlobe/>
                                {" "} English
                            </p>
                        </div>
                   </div>       
                </div>
                
                <div className='right-[1rem] top-[60px] mx-auto min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block'>
                <CourseDetailsCard 
                    course = {courseData?.data}
                    setConfirmationModal = {setConfirmationModal}
                    handleBuyCourse = {handleBuyCourse}
                />
                </div>
            </div>
        </div>

        {/* What will you learn, Course Content, Sections dropdown, Author */}
        <div className='mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]'>
            <div className='mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]'>
                <div className='my-8 border border-richblack-600 p-8 rounded-lg'>
                <p className='text-3xl font-semibold'> What You Will Learn</p>
                <div className='mt-5 ml-4 text-richblack-400'>
                    {whatYouWillLearn}
                </div>
                </div>
            
                <div className='max-w-[830px] '>

                    <div className='flex flex-col gap-3'>
                        <p className='text-[28px] font-semibold'>Course Content :-</p>
                        
                            <div className='flex flex-wrap justify-between gap-2'>
                                <div className='flex gap-4 text-richblack-400'>
                                  <span>{courseContent.length} - Section(s)</span>
                                  <span>
                                        {totalNoOfLectures} -  Lecture(s)
                                  </span>
                                  <span>
                                        Total Length : {getDuration(courseContent)}
                                  </span>
                                </div>
                                <div>
                                    <button
                                        className='text-[#00b0f0]'
                                        onClick={() => setIsActive([])}>
                                        Collapse all Sections
                                    </button>
                                </div>
                            </div>
                        
                    </div>

                    <div className='py-4'>
                        {
                            courseContent.map((section) => (
                                <div key={section._id} className='overflow-hidden border border-solid border-richblack-600 
                                bg-richblack-700 text-richblack-5 last:mb-0'>
                                    {/* Section */}
                                    <div onClick={()=> handleActive(section._id)}>
                                        <div className='flex cursor-pointer items-start justify-between bg-opacity-20 px-7  py-6 transition-[0.3s]'>
                                            <div className='flex items-center gap-2'>
                                                {isActive.includes(section._id)? (<i className=' -rotate-90'><MdOutlineArrowForwardIos/></i>) : (<i className=' rotate-90'><MdOutlineArrowForwardIos/></i>)}
                                                <p>{section.sectionName}</p>
                                            </div>

                                            <div className=' space-x-4'>
                                                <span className=' text-[#00b0f0]'> {`${section.subSection.length} lecture(s)`} </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* SubSections */}
                                    {section.subSection.map((subSection)=> (
                                        <div className={` ${isActive.includes(section._id) ? 'h-[88px]' : ''} h-0 overflow-hidden bg-richblack-900 transition-[height] duration-[0.35s] ease-[ease]`}>
                                                <div key={subSection._id} className='text-textHead flex flex-col gap-2 px-7 py-6 font-semibold'>
                                                    <div className='py-2 flex justify-start items-center gap-2'>
                                                        <span>
                                                            <BiVideo/>
                                                        </span>
                                                        <p>
                                                            {subSection.title}
                                                        </p>
                                                    </div>
                                                </div>
                                        </div>
                                    ))}
                                </div>
                            ) )
                        }
                    </div>

                    <div className='mb-12 py-4'>
                        <p className="text-[28px] font-semibold">Author</p>
                        <div className=' flex items-center gap-4 py-4'>
                            <img className='h-14 w-14 rounded-full object-cover' src={instructor.image}/>
                            <p className='text-lg'>{instructor.firstName} {instructor.lastName}  </p>
                        </div>
                        <p className='text-lg'>
                                {instructor.additionalDetails.about}
                            </p>
                    </div>
                </div>
            </div>
        </div>
        
        <Footer/>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </>
  )
}

export default CourseDetails;