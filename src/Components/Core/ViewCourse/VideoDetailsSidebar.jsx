import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import IconBtn from "../../Common/IconBtn";
import { BsChevronDown } from "react-icons/bs";
import { BiVideo } from 'react-icons/bi';

const VideoDetailsSidebar = ({setReviewModal}) => {
    const [activeStatus, setActiveStatus] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const {sectionId, subSectionId} = useParams();
    const {courseSectionData, courseEntireData,
    totalNoOfLectures, completedLectures} = useSelector((state) => state.ViewCourse);

    useEffect(() => {
        ;(() => {
            if(!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            );
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.
            subSection.findIndex((data) => data.id === subSectionId);
            const activeSectionId = courseSectionData?.[currentSectionIndex]?._id;
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection
            [currentSubSectionIndex]?._id;
            setActiveStatus(activeSectionId);
        })()
    }, [courseSectionData, courseEntireData, location.pathname]);

    return(
        <>
            <div className='flex min-w-[257px] flex-col border-r-[2px] border-richblack-700
            bg-richblack-800 py-10 overflow-auto'>
                {/* For Buttons and Heading */}
                <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 
                 py-5 text-lg font-bold text-richblack-25">
                    {/* For Buttons */}
                    <div className="flex w-full items-center justify-between ">

                        <div onClick={()=> {navigate("/dashboard/enrolled-courses")}}
                        className="flex h-[35px] w-[35px] items-center justify-center 
                        rounded-full bg-richblack-100 p-1 text-richblack-700 
                        hover:scale-95 transition-all duration-200">
                            <IoIosArrowBack size={30}/>
                        </div>

                        <IconBtn text="Add Review"
                        onClick={() => setReviewModal(true)}/>

                    </div>

                    {/* For Heading */}
                    <div className="flex flex-col">
                        <p>{courseEntireData.courseName}</p>
                        <p className="text-sm font-semibold text-richblack-500">
                            {completedLectures?.length || 0} / {totalNoOfLectures}
                        </p>
                    </div>
                </div>
                
                {/* For Displaying Course Content */}
                <div className="py-4">
                {
                    courseSectionData.map((sec) => (
                        // Section Data
                        <div className='overflow-hidden border-y-2 border-solid border-richblack-600 
                        bg-richblack-700 text-richblack-5' onClick={() => setActiveStatus(sec?._id)}>
                            <div className='flex cursor-pointer items-center justify-between bg-opacity-20
                            px-7 py-3 transition-[0.3s]'>
                                <div>{sec?.sectionName}</div>
                                <span className={`${activeStatus === sec._id ? 
                                'rotate-180' :'rotate-0'} transition-all duration-200`}>
                                    <BsChevronDown/>
                                </span>
                            </div>

                            {/* Corresponding Sub-Sections */}
                            {
                                sec.subSection.map((sub) => (
                                    <div className={`${activeStatus === sec?._id ? 'h-[72px]' : ''}
                                    ${subSectionId === sub?._id ? 'text-lg text-blue-500 font-bold transition-[subSectionId] duration-75' : 
                                    'text-md text-richblack-5'}
                                    h-0 bg-richblack-900 transition-all flex justify-center
                                    duration-[0.35s] ease-[ease]`} onClick={() => {
                                        navigate(`/view-course/${courseEntireData?._id}/section/${sec?._id}/sub-section/${sub?._id}`);
                                    }}
                                    >    
                                            <div className='py-2 flex justify-start items-center gap-2 my-auto
                                            w-9/12'>
                                                <span className={`${completedLectures?.includes(sub._id) ? 
                                                'text-caribbeangreen-500' : ''} 
                                                transition-all duration-[0.35s] ease-[ease]`}>
                                                    <BiVideo/>
                                                </span>
                                                <p>
                                                    {sub.title}
                                                </p>
                                            </div>
    
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
                </div>
            </div>
        </>
    );
}

export default VideoDetailsSidebar;