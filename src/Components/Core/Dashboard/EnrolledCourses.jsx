import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../Services/Operations/ProfileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import {useNavigate} from "react-router-dom"
import { getWatchedLecturesAPI } from "../../../Services/Operations/courseDetailsAPI";

const EnrolledCourses = () => {
    const {token} = useSelector((state) => state.Auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();
    const getEnrolledCourses = async () => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        }
        catch(error){
            console.log('Unable to fetch enrolled courses');
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    return(
        <div className="w-full my-20">
            <div className={`!${enrolledCourses ? 'mb-0' : 'mb-14'} text-3xl font-medium text-richblack-5`}>
                Enrolled Courses
            </div>
            {
                !enrolledCourses ? (
                    <div className="grid h-[70vh] w-full place-content-center">
                        <div className="spinner"></div>
                    </div>
                    
                ) : enrolledCourses.length===0 ? (
                <p className="grid h-[10vh] w-full place-content-center text-richblack-100">
                    You have not yet enrolled in any courses
                </p>
                ) : (
                    <div className="my-8 text-richblack-5 flex flex-col">
                        <div className="flex bg-richblack-500 rounded-t-lg">
                            <p className="w-[45%] px-5 py-3 hidden md:block">Course Name</p>
                            <p className="w-1/4 py-3 hidden md:block">Duration</p>
                            <p className="py-3 hidden md:block">Progress</p>
                            <p className="block md:hidden mx-auto py-3">
                                Course Details
                            </p>
                        </div>
                        {
                            enrolledCourses?.map((course, index) => (
                            <div className={`flex flex-col md:flex md:flex-row items-center border border-richblack-700 
                            ${index === enrolledCourses.length-1 ? 'rounded-b-lg' : ''}`}>
                                <div className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                                onClick={() => navigate(`/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0].subSection?.[0]._id}`)}>
                                    <img src={course.thumbnail} className="h-14 w-14 rounded-lg object-cover"/>
                                    <div>
                                        <p className="font-semibold">
                                            {course.courseName}
                                        </p>
                                        <p className="text-xs text-richblack-300">
                                            {course.courseDescription}
                                        </p>
                                    </div>
                                </div>

                                <div className="w-1/4 py-3 text-center md:text-start">
                                    {course?.totalDuration}
                                </div>

                                <div className="flex w-1/5 flex-col gap-2 py-3">
                                    <p>Progress : {course?.progressPercentage || 0} %</p>
                                    <ProgressBar completed={course?.progressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false} />
                                </div>
                            </div>   
                            ))
                        }
                    </div>
                )
            }
        </div>
    );
}

export default EnrolledCourses;