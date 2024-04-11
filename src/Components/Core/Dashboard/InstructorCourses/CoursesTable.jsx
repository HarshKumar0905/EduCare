import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import convertSecondsToDuration from '../../../../Utils/secToDurationFrontend'
import { formatDate } from "../../../../Services/formatDate"
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../Services/Operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../Utils/Constants"
import ConfirmationModal from "../../../Common/ConfirmationModal"

const CoursesTable = ({courses, setCourses}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.Auth);
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId)=> {
        setLoading(true);
        await deleteCourse({courseId:courseId}, token)
        const result = await fetchInstructorCourses(token)
        // console.log("Incourse table result is", result)
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null);
        setLoading(false)
    }


    function getDuration(course) {
      let totalDurationInSeconds = 0
      course.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
    return totalDuration;
    }
    
  return (
    <>
      <Table className="border border-richblack-100 rounded-md relative w-full">
        <Thead>
          <Tr className="flex gap-x-16 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </th>
            <th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </th>
            <th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </th>
            <th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 p-8 w-fit"
              >
                <Td className="flex flex-col xl:flex xl:flex-row gap-y-4 xl:gap-y-0 gap-x-12 translate-x-[-50%]
                translate-y-[4%] sm:translate-x-[0%] sm:translate-y-[0%]">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] object-cover rounded-md"
                  />
                  <div className="flex flex-col justify-between w-96 gap-y-2 xl:gap-y-0">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300 flex">
                      {course?.description?.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-caribbeangreen-300">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-caribbeangreen-300 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <div className="flex flex-col items-center gap-y-2">
                <Td className="text-sm font-medium text-richblack-100 absolute sm:right-[16.4rem] md:right-[12rem] lg:right-[16.4rem]">
                  {getDuration(course)}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 absolute sm:right-[9.7rem] md:right-[7rem] lg:right-[9.7rem]">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 absolute sm:right-6">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
                </div>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CoursesTable;