import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse/PublishCourse";

const RenderSteps = () => {
    const { step } = useSelector((state) => state.Course);
    const steps = [ 
        { id:1, title: "Course Information" },
        { id:2, title: "Course Builder" },
        { id:3, title: "Publishing Course" } 
    ];
    return(
        <>
            <div className="flex justify-center ml-16 mb-3">
            {
                steps.map((item) => (
                <div className="flex w-full">
                        <button className={`${(step)===item.id ? 'border-[#00b0f0] bg-[#00b0f03e] text-[#00b0f0]' 
                        :'border-richblack-700 bg-richblack-800 text-richblack-300'} cursor-default aspect-square
                        w-[34px] rounded-full border-[1px] flex justify-center items-center
                        ${(step) > item.id ? 'bg-[#00b0f0]' : ''}`}>
                        {
                            (step) > item.id ? (<FaCheck className='font-bold text-black'/>)
                            : (item.id)
                        }
                        </button>
                    {
                        item.id !== steps.length && (
                            <>
                                <div key={item.id}
                                className={`h-[calc(34px/2)] w-full  border-dashed border-b-2 
                                ${step > item.id  ? "border-[#00b0f0]" : "border-richblack-500"}`} />
                            </>
                        )
                    }
                </div>
                ))
            }
            </div>
            <div className="flex gap-x-[4rem] ml-4">
            {
                steps.map((item) => (
                    <div className="">
                        <p className={`text-sm ${step >= item.id ? "text-richblack-5" : "text-richblack-500"}`}>
                            {item.title}
                        </p>
                    </div>
                ))
            }
            </div>
            {step === 1 && <CourseInformationForm />}
            {step === 2 && <CourseBuilderForm />}
            {step === 3 &&  <PublishCourse /> }
        </>
    );
}

export default RenderSteps;