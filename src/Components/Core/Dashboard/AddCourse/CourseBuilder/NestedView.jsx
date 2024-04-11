import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxDropdownMenu } from "react-icons/rx";
import {deleteSection, deleteSubSection} from "../../../../../Services/Operations/courseDetailsAPI"
import { setCourse } from "../../../../../Slices/CourseSlice"
import ConfirmationModal from "../../../../Common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useEffect } from "react";

const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector((state) => state.Course);
    const {token} = useSelector((state) => state.Auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course._id,
            token
        })
        if(result){
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }
    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({subSectionId, sectionId, token});
        if(result){
            const updatedCourseContent = course.courseContent.map((section)=> 
            section._id===sectionId ? result : section)

            const updatedCourse = {...course, courseContent: updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }
        setConfirmationModal(null);
    }

    return(
        <>
        <div className="rounded-lg bg-richblack-700 p-6 px-8">
            <div>
                {course?.courseContent?.map((section) => (
                    <details open>
                        <summary className="flex cursor-pointer items-center 
                        justify-between border-b-2 border-b-richblack-5 py-2">
                            <div className="flex items-center gap-x-3">
                                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">
                                    {section.sectionName}
                                    {console.log("Section Details : ", section)}
                                </p>
                            </div>
                            <div className="flex items-center gap-x-3">
                                <button onClick={() => handleChangeEditSectionName(
                                  section._id,
                                  section.sectionName)}
                                >
                                    <MdEdit className="text-xl text-richblack-5"/>
                                </button>
                                <button onClick={() => {
                                  setConfirmationModal({
                                  text1: "Delete this Section?",
                                  text2: "All the lectures in this section will be deleted.",
                                  btn1Text: "Delete",
                                  btn2Text: "Cancel",
                                  btn1Handler: () => handleDeleteSection(section._id),
                                  btn2Handler: () => setConfirmationModal(null)
                                })}}>
                                    <RiDeleteBin6Line className="text-xl text-richblack-5"/>
                                </button>
                                <span className="font-medium text-richblack-5">|</span>
                                <AiFillCaretDown className={`text-xl text-richblack-5`}/>
                            </div>
                        </summary>
                        <div className="px-6 pb-4">
                        {
                            section?.subSection?.map((data) => (
                                <div
                                className="flex cursor-pointer items-center 
                                justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2">
                                    <div className="flex items-center gap-x-3">
                                        <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                        <p className="font-semibold text-richblack-50">
                                            {data.title}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <button onClick={() => setEditSubSection({
                                          ...data,
                                          sectionId : section._id})}>
                                            <MdEdit className="text-xl text-richblack-5"/>
                                        </button>
                                        <button onClick={() => {
                                          setConfirmationModal({
                                          text1: "Delete this Sub-Section?",
                                          text2: "Selected lecture in this section will be deleted.",
                                          btn1Text: "Delete",
                                          btn2Text: "Cancel",
                                          btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                          btn2Handler: () => setConfirmationModal(null)
                                        })}}>
                                           <RiDeleteBin6Line className="text-xl text-richblack-5"/>
                                        </button>
                                        <span className="font-medium text-richblack-5">|</span>
                                        <AiOutlineEye className={`text-xl text-richblack-5`}
                                        onClick={() => setViewSubSection(data)}/>
                                    </div>
                                </div>
                            ))
                        }
                        <button
                          onClick={() => setAddSubSection(section._id)}
                          className="mt-3 flex items-center gap-x-2 text-yellow-50">
                            <FaPlus className="text-lg" />
                            <p>Add Lecture</p>
                        </button>
                        </div>
                    </details>
                ))}
            </div>
        </div>
        {
            addSubSection ? (<SubSectionModal modalData = {addSubSection}
                setModalData = {setAddSubSection}
                add= {true}/>) : 
            viewSubSection ? (<SubSectionModal modalData={viewSubSection}
                setModalData={setViewSubSection}
                view={true}/>) :
            editSubSection ? (<SubSectionModal modalData={editSubSection}
                setModalData={setEditSubSection}
                edit={true}/>) : (<div></div>)
        }
        {confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>) : (<></>)}
        </>
    );
}

export default NestedView;