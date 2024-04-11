import React from 'react'
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../../Services/Operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"
import CoursesTable from "./InstructorCourses/CoursesTable"

const MyCourses = () => {
  const {token} = useSelector((state)=> state.Auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if(result) 
        setCourses(result);
  }

  fetchCourses();
}, []);
  

  return (
    <div className="w-full my-20">
      <div className="mb-14 flex items-center justify-between">
        <h1 className=' text-3xl font-medium text-richblack-5'>My Courses</h1>
        <IconBtn text="Add Course" 
        onClick={() => navigate("/dashboard/add-course")}>
          <VscAdd/>
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses}/>}
    </div>
  )
}

export default MyCourses;