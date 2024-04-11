import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoAddCircleOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from "../../../../Common/IconBtn";
import { createSection, updateSection } from "../../../../../Services/Operations/courseDetailsAPI";
import { setCourse, setEditCourse, setStep } from "../../../../../Slices/CourseSlice";
import NestedView from "./NestedView";

const CourseBuilderForm = () => {
    const {course} = useSelector((state) => state.Course);
    const {token} = useSelector((state) => state.Auth);
    const {register, setValue, getValues, handleSubmit, 
    formState: {errors}} =  useForm();
    const dispatch = useDispatch();
    const [editSectionName, setEditSectionName] = useState(null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        if(editSectionName){
            result = await updateSection({
                sectionName : data.sectionName,
                sectionId : editSectionName,
                courseId : course._id,
            }, token);
        }
        else{
            result = await createSection({
                sectionName : data.sectionName,
                courseId : course._id
            }, token);
        }
        if(result){
            dispatch(setCourse(result));
            console.log("Current course details : ", course);
            setEditSectionName(null);
            setValue("sectionName", "");
            console.log("New Updated Section's Course : ", result);
        }
        setLoading(false);
    }
    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName", "");
    }
    const goToNext = () => {
        if(course.courseContent?.length === 0){
          toast.error("Please add atleast one section");
          return
        }
        if(course.courseContent.some((section) => section.subSection?.length === 0)){
          toast.error("Please add atleast one lecture in each section");
          return
        }
        dispatch(setStep(3));
    } 
    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }
    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }

    return(
        <div className="space-y-8 rounded-md border-[1px] mt-16 
        border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-bold text-richblack-5">
                Course Builder
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input 
                      id='sectionName'
                      placeholder='Add a section to build course'
                      {...register("sectionName", {required: true})}
                      style={{
                      boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    />
                    {
                        errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Section name is required
                        </span>)
                    }
                </div>
                <div className="flex gap-x-5">
                    <IconBtn type="submit" 
                      text={editSectionName ? 'Edit Section Name' : 'Create Section'}
                      outline={true}>
                        <IoAddCircleOutline size={20} className="text-[#00b0f0]"/>
                    </IconBtn>
                    {
                        editSectionName && (
                        <button
                          type="button"
                          onClick={cancelEdit}
                          className="text-sm text-richblack-300 underline"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            {course?.courseContent?.length>0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )}
            <div className="flex justify-end gap-x-3">
                <button onClick={goBack} className={`flex cursor-pointer items-center 
                gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold 
                text-richblack-900 transition-all hover:scale-95 duration-200ms`}>
                    Back
                </button>
                <IconBtn disabled={loading} text="Next" onClick={goToNext}>
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </div>
    );
}

export default CourseBuilderForm;