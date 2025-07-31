import {toast} from "react-hot-toast";
import {studentEndpoints} from "../API";
import {APIConnector} from "../APIConnector";
import rzpLogo from "../../Assets/Logo/rzp_logo.png";
import { resetCart } from "../../Slices/CartSlice";
import { setPaymentLoading } from "../../Slices/CourseSlice";
const {COURSE_PAYMENT_API, COURSE_VERIFY_API, 
SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        }
        script.onerror = () => {
            resolve(false);
        }
        document.body.appendChild(script);
    });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch){
    const toastId = toast.loading("Loading...");
    try{
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if(!res){
            toast.error("Razorpay SDK failed to load");
            return;
        }
        const orderResponse = await APIConnector("POST", COURSE_PAYMENT_API,
        {courses}, {Authorization : `Bearer ${token}`});
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message);
        }
        console.log("Order Response : ",  orderResponse);
        const options = {
            key : process.env.REACT_APP_RAZORPAY_KEY,
            currency : orderResponse.data.message.currency,
            amount : `${orderResponse.data.message.amount}`,
            order_id : orderResponse.data.message.id,
            name : "EduCare",
            description : "Thank you for purchasing the course",
            image : rzpLogo,
            prefill : {
                name : `${userDetails.firstName}`,
                email : userDetails.email
            },
            handler : function(response){
                sendPaymentSuccessEmail(response,orderResponse.data.message.amount,token);
                verifyPayment({...response, courses}, token, navigate, dispatch);
            }
        }

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", (response)=> {
            toast.error("oops, payment failed");
            console.log(response.error);
        });
    }
    catch(error){
        console.log("PAYMENT API ERROR.....", error);
        toast.error("Could not make payment");
    }
    toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token){
    try{
        console.log("Response : ", response);
        await APIConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId : response.razorpay_order_id,
            paymentId : response.razorpay_payment_id,
            amount
        }, {Authorization : `Bearer ${token}`});
    }
    catch(error){
        console.log("PAYMENT SUCCESS EMAIL ERROR...");
    }
}

async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));
    try{
        const response = await APIConnector("POST", COURSE_VERIFY_API, bodyData,
        {Authorization : `Bearer ${token}`});
        if(!response.data.success) 
            throw new Error(response.data.message);
        toast.success("Payment Successful, you are added to the course");
        navigate("/dashboard/enrolled-courses");
        dispatch(resetCart());
    }
    catch(error){
        console.log("PAYMENT VERIFICATION ERROR...");
        toast.error("Could not verify payment");
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}