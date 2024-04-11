import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { fetchInstructorCourses } from "../../../../Services/Operations/courseDetailsAPI";
import { getInstructorData } from "../../../../Services/Operations/ProfileAPI";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

const Instructor = () => {
    const {token} = useSelector((state) => state.Auth);
    const {user} = useSelector((state) => state.Profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);
            const instructorAPIData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);
            if(instructorAPIData.length)
                setInstructorData(instructorAPIData);
            if(result)
                setCourses(result);
            setLoading(false); 
        }
        getCourseDataWithStats();
    }, []);

    const totalAmount = instructorData?.reduce((acc,curr) => 
    acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc,curr) =>
    acc + curr.totalStudentsEnrolled, 0);

    return(
        <div className="mt-20">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold text-richblack-5">
                    Hi {user?.firstName} 👋
                </h1>
                <p className="font-medium text-richblack-200">
                    Let's start something new   
                </p>
            </div>
            {
                loading ? (
                    <div className="pt-[28vh] flex justify-center items-center">
                        <div className="spinner"></div>
                    </div>
                ) : ( courses?.length > 0 ? (
                    <div className="lg:min-w-[100%] max-w-[570px]">
                        <div className="my-4 flex h-[450px] space-x-4 overflow-scroll">
                        {/* Render chart / graph */}
                        { totalAmount>0 || totalStudents>0 ? (
                            <InstructorChart courses={instructorData} className=""/>
                        ) : (
                            <div className="flex-1 rounded-md bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">
                                    Visualize
                                </p>
                                <p className="mt-4 text-xl font-medium text-richblack-50">
                                    Not Enough Data To Visualize
                                </p>
                            </div>
                        )}
                            {/* Total Statistics */}
                            <div className="flex min-w-[250px] flex-col rounded-md
                            bg-richblack-800 p-6">
                                <p className="text-lg font-bold text-richblack-5">
                                    Statistics
                                </p>
                                <div className="mt-4 space-y-4">
                                  <div>
                                      <p className="text-lg text-richblack-200">
                                        Total Courses
                                      </p>
                                      <p className="text-3xl font-semibold text-richblack-50">
                                        {courses.length}
                                      </p>
                                  </div>
                                  <div>
                                      <p className="text-lg text-richblack-200">
                                        Total Students
                                      </p>
                                      <p className="text-3xl font-semibold text-richblack-50">
                                        {totalStudents}
                                      </p>
                                  </div>
                                  <div>
                                      <p className="text-lg text-richblack-200">
                                        Total Income
                                      </p>
                                      <p className="text-3xl font-semibold text-richblack-50">
                                        {totalAmount}
                                      </p>
                                  </div>
                                </div>
                            </div>
                        </div>

                        {/* Render any 3 courses */}
                        <div className="rounded-md bg-richblack-800 p-6 mb-10 flex flex-col flex-wrap">
                            <div className="flex items-center justify-between mb-4">
                                <p className="text-lg font-bold text-richblack-5">
                                    Your Courses
                                </p>
                                <Link to="/dashboard/my-courses">
                                    <p className="text-xs font-semibold text-[#00b0f0]">
                                        View All
                                    </p>
                                </Link>
                            </div>
                            <div className="flex md:flex md:flex-row gap-x-4 flex-col gap-y-4">
                            {
                                courses.slice(0,3).map((course) => (
                                    <div className="md:w-1/3 w-full">
                                        <img
                                          src={course.thumbnail}
                                          alt={course.courseName}
                                          className="h-[201px] w-full rounded-md object-cover"
                                        />
                                        <div className="mt-3 w-full flex flex-col items-center">
                                            <p className="text-sm font-medium text-richblack-50">
                                                {course.courseName}
                                            </p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <p className="text-xs font-medium text-richblack-300">
                                                    {course.studentsEnrolled.length} students
                                                </p>
                                                <p className="text-xs font-medium text-richblack-300">
                                                    |
                                                </p>
                                                <p className="text-xs font-medium text-richblack-300">
                                                    Rs. {course.price}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
                        <p className="text-center text-2xl font-bold text-richblack-5">
                            You have not created any courses yet
                        </p>
                        <Link to="/dashboard/add-course">
                            <p className="mt-1 text-center text-lg font-semibold text-[#00b0f0]">
                                Create A Course
                            </p>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
}

export default Instructor;