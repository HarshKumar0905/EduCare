import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { sendContactDetails } from "../../Services/Operations/authAPI";
import CountryCode from "../../Data/countrycode.json";
import toast from "react-hot-toast";
import { useInView } from "react-intersection-observer";

const ContactUsForm = () => {
    const [ref, inView] = useInView();
    const dispatch = useDispatch();
    const {
        register, handleSubmit,
        reset, formState : {errors, 
        isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        try{
            dispatch(sendContactDetails(
                data.firstName,
                data.lastName,
                data.email,
                data.countryCode,
                data.phoneNo,
                data.message
            ));
        }
        catch(error){
            console.log(error);
        }   
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({  
                firstName : '',
                lastName : '',
                email : '',
                countryCode : '',
                phoneNo : '',
                message : '',   
            });
        }
    }, [reset, isSubmitSuccessful]);

    return(
        <form onSubmit={handleSubmit(submitContactForm)}
        className='flex flex-col gap-7'>
            <div className='flex flex-col gap-5 lg:flex-row'>
                <label className='flex flex-col gap-1 lg:w-[48%]' htmlFor="firstName">
                    <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter Your First Name'
                    style={{
                        boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    {...register('firstName', {required:true})}
                    />
                    {
                        errors.firstName && (
                            <span>
                                Please Enter Your Name
                            </span>
                        )
                    }
                </label>
                <label className='flex flex-col gap-1 lg:w-[48%]' htmlFor="lastName">
                    <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Enter Your Last Name'
                    style={{
                        boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                      }}
                      className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                    {...register('lastName', {required:true})}
                    />
                    {
                        errors.lastName && (
                            <span>
                                Please Enter Your Name
                            </span>
                        )
                    }
                </label>
            </div>

            <label htmlFor="email">
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
                    Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter Your Email Address'
                    {...register('email', {required:true})}
                    style={{
                        boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {
                    errors.email && (
                        <span>
                            Please Enter Your Email Address
                        </span>
                    )
                }
            </label>

            <label htmlFor="phoneNo">
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
                    Phone Number <sup className="text-pink-200">*</sup>
                </p>
                <div className='flex gap-5'>
                    <div style={{
                        boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-[80px] rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5">
                        <select
                            name='dropdown'
                            id="dropdown"
                            className='form-style w-full bg-transparent'
                            {...register("countryCode", {required:true})}>
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                    </div>      
                   <div className='flex w-[calc(100%-80px)] flex-col gap-2'>
                        <input
                            type='number'
                            name='phoneNo'
                            id='phoneNo'
                            placeholder='12345 67890'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"}
                            })}
                            style={{
                                boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                        />
                   </div>       
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            Please Enter Your Phone Number
                        </span>
                    )
                }
            </label>

            <label htmlFor="message">
                <p className="mb-1 text-[1rem] leading-[1.375rem] text-richblack-5">
                    Message <sup className="text-pink-200">*</sup>
                </p>
                <textarea
                    name='message'
                    id='message'
                    cols='30'
                    rows='7'
                    placeholder='Enter Your Message Here'
                    {...register('message', {required:true})}
                    style={{
                        boxShadow: "inset 0px -2px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-700 p-[12px] text-richblack-5"
                />
                {
                    errors.message && (
                        <span>
                            Please Enter Your Message
                        </span>
                    )
                }
            </label>

            <button type='submit' ref={ref}
            className={`rounded-[8px] bg-[#00b0f0] py-[8px] px-[12px] font-bold text-richblack-900
            hover:scale-95 transition-all duration-200 ${inView ? 'animate-button' : 'opacity-0'}`}>
                Send Message
            </button>
        </form>
    );
}

export default ContactUsForm;