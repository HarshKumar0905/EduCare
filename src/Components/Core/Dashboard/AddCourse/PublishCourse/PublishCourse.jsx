import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IconBtn from "../../../../Common/IconBtn"
import { editCourseDetails } from "../../../../../Services/Operations/courseDetailsAPI";
import { resetCourseState, setStep } from "../../../../../Slices/CourseSlice";
import { COURSE_STATUS } from "../../../../../Utils/Constants";

const PublishCourse = () => {
    const {register, handleSubmit, setValue, getValues, 
    formState: {errors}} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);
    const {token} = useSelector((state)=> state.Auth);
    const {course} = useSelector((state)=> state.Course);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(course?.status === COURSE_STATUS.PUBLISHED)
            setValue("public", true);
    })

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }
    const goBack = () => {
        dispatch(setStep(2))
    }
    const handleCoursePublish = async () => {
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
        (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)){
            goToCourses();
            return;
        }
        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        if(result)
            goToCourses();
        setLoading(false);
    }
    const onSubmit = () => {
        handleCoursePublish();
    }

    return(
        <div className="space-y-8 rounded-md border-[1px] mt-16 
        border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-bold text-richblack-5">
                Publish Course
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-5">
                <div className="flex flex-col space-y-2 relative">
                    <div className="flex gap-x-3">
                    <input 
                      type='checkbox'
                      id='public'
                      {...register("public", {required: true})}
                      className="h-5 w-5"
                    />
                    <label className="text-sm text-richblack-5" htmlFor="public">
                        Make this course as public <sup className="text-pink-200">*</sup>
                    </label>
                    </div>
                    {
                        errors.public && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Ckeckbox should be checked
                        </span>)
                    }
                </div>
                <div className="ml-auto flex max-w-max items-center gap-x-4">
                    <button
                      disabled={loading}
                      type="button"
                      onClick={goBack}
                      className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 
                      py-[8px] px-[20px] font-semibold text-richblack-900 transition-all duration-200 hover:scale-95">
                        Back
                    </button>
                    <IconBtn disabled={loading} text="Save Changes" />
                </div>
            </form>
        </div>
    );
}

export default PublishCourse;