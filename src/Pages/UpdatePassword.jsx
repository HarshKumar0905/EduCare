import React, { useState } from "react";
import { toast } from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { resetPassword } from "../Services/Operations/authAPI";

const UpdatePassword = () => {

    const location = useLocation();
    const {loading} = useSelector((state) => state.Auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({password:'',confirmPassword:''});
    const {password, confirmPassword} = formData;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name] : [e.target.value]
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(password[0] !== confirmPassword[0]){
            toast.error('Passwords do not match');
            return;
        }
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password[0], confirmPassword[0], token, navigate));
    }

    return(
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        {
            loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="max-w-[500px] p-4 lg:p-8">
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        Chose New Password
                    </h1>
                    <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                        Almost done. Enter your new password and you're all set.
                    </p>
                    <form onSubmit={handleOnSubmit}>
                        <label className="w-full relative">
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                New Password
                                <sup className="text-pink-200"> *</sup>
                            </p>
                            <input
                            required
                            type={showPassword?'text':'password'}
                            name='password'
                            value={password}
                            placeholder="Enter New Password"
                            onChange={handleOnChange}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="mb-4 w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            ></input>
                            <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                            {
                              !showPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                              ) : (
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                            }
                            </span>
                        </label>
                        <label className="w-full relative">
                            <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                Confirm Password
                                <sup className="text-pink-200"> *</sup>
                            </p>
                            <input
                            required
                            type={showConfirmPassword?'text':'password'}
                            name='confirmPassword'
                            value={confirmPassword}
                            placeholder="Confirm New Password"
                            onChange={handleOnChange}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            ></input>
                            <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[87px] z-[10] cursor-pointer">
                            {
                              !showConfirmPassword ? (
                              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                              ) : (
                              <AiOutlineEye fontSize={24} fill="#AFB2BF" />)
                            }
                            </span>
                        </label>
                        <button
                        type="submit"
                        className="mt-6 rounded-[8px] bg-[#00b0f0] p-[12px] font-medium text-richblack-900
                        hover:scale-95 transition-all duration-200 w-full">
                            Update Password
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between
                    hover:scale-95 transition-all duration-200">
                        <Link to='/login'>
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack/> Back To Login
                            </p>
                        </Link>
                    </div>
                </div>
            )
        }
        </div>
    )
}

export default UpdatePassword;