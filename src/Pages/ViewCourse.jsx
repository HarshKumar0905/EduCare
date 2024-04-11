import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../Services/Operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, 
setEntireCourseData, setTotalNoOfLectures } from '../Slices/ViewCourseSlice';
import Footer from "../Components/Common/Footer";
import VideoDetailsSidebar from "../Components/Core/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../Components/Core/ViewCourse/CourseReviewModal";

const ViewCourse = () => {
    const [reviewModal, setReviewModal] = useState(false);
    const {courseId} = useParams();
    const {token} = useSelector((state)=> state.Auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const {courseSectionData, courseEntireData, completedLectures} 
    = useSelector((state)=>state.ViewCourse);

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            const courseData = await getFullDetailsOfCourse(courseId, token);
            dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
            dispatch(setEntireCourseData(courseData?.courseDetails));
            dispatch(setCompletedLectures(courseData?.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length;
            });
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    }, [courseId]);

    return(
        <>
            <div className="relative flex flex-col lg:flex lg:flex-row min-h-[52.6rem] setBackground">
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className="w-full">
                    <div className="mx-auto w-11/12 max-w-[1000px]">
                        <Outlet/>
                    </div>
                </div>
                {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal}/>)}
            </div>
            <Footer/>
        </>
    );
}

export default ViewCourse;