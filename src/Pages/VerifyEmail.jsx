import React from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../Services/Operations/authAPI";
import { RxCountdownTimer } from "react-icons/rx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const VerifyEmail = () => {
    const {signupData, loading} = useSelector((state) => state.Auth);
    const [otp, setOtp] = useState('');
    const [fName, setFName] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(!signupData){
            navigate('/signup');
        }
        else{
            const {firstName} = signupData;
            setFName(firstName);
        } 
    }, [navigate, signupData]);

    const submitHandler = (e) => {
        e.preventDefault();
        const {accountType, firstName, lastName, email, password, confirmPassword} = signupData;
        console.log('Hi');
        dispatch(signUp(accountType, firstName, lastName, email, 
            password, confirmPassword, otp, navigate));
        console.log('Harsh');
    }

    return(
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
        {
            loading ? (
                <div className="spinner"></div>
            ) : (
                <div className='max-w-[500px] p-4 lg:p-8'>
                    <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                        Hi {fName ? fName : ''}, Verify Your Email
                    </h1>
                    <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                        A verification code has been sent to you. Enter the code below :-
                    </p>
                    <form onSubmit={submitHandler}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            renderInput={(props) => (
                                <input
                                {...props}
                                placeholder="-"
                                style={{
                                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                />
                            )}
                            containerStyle={{
                                justifyContent: "space-between",
                                gap: "0 6px",
                            }} 
                        />
                            
                        <button type='submit'
                        className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900
                        hover:scale-95 transition-all duration-200">
                            Verify Email
                        </button>
                    </form>
                    <div className="mt-6 flex items-center justify-between">
                        <Link to='/login'>
                            <p className="flex items-center gap-x-2 text-richblack-5
                            hover:scale-95 transition-all duration-200">
                                <BiArrowBack/> Back To Login
                            </p>
                        </Link>
                        <button onClick={() => {dispatch(sendOtp(signupData.email), navigate)}}
                        className="flex items-center text-blue-100 gap-x-2
                        hover:scale-95 transition-all duration-200">
                            <RxCountdownTimer/>
                            Resend It
                        </button>
                    </div>
                </div>
            )
        }
        </div>
    );
}

export default VerifyEmail;