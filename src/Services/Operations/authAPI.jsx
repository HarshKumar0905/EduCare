import {toast} from "react-hot-toast"
import {setLoading, setToken} from "../../Slices/AuthSlice";
import {resetCart} from "../../Slices/CartSlice";
import {setUser}  from "../../Slices/ProfileSlice";
import {APIConnector} from "../APIConnector";
import {endpoints} from '../API';

const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
  CONTACTUS_API
} = endpoints;

// Functions to make async backend calls with data from UI or store and then to update UI or control the navigation after receiving response.
export function sendOtp(email, navigate){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...");
     dispatch(setLoading(true));

     try {
      const response = await APIConnector("POST", SENDOTP_API, {
        email,
        checkUserPresent : true
      });

      if(!response.data.success){
        throw new Error(response.data.message);
      }

      toast.success("OTP Sent Successfully")
      navigate("/verify-email");
     } catch (error) {
      console.log("SENDOTP API ERROR............", error);
      toast.error("Could Not Send OTP");
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function signUp(
  accountType,
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));

     try {
      const response = await APIConnector("POST", SIGNUP_API, {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp
      });

      console.log("SIGNUP_API RESPONSE............", response)

      console.log(response.data.success)

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Sign Up successful");
      navigate("/login");
     } catch (error) {
      console.log("SIGNUP_API ERROR............", error)
      toast.error("Could Not Sign Up User");
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function login(email, password, navigate){
  return async (dispatch) => {
     const toastId = toast.loading("Loading...")
     dispatch(setLoading(true));
      try {
      const response = await APIConnector("POST", LOGIN_API, {
        email,
        password
      });

      if(!response.data.success){
        throw new Error(response.data.message)
      }

      toast.success("Logged In Successfully");
      console.log("hello ji");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.existingUser?.image
        ? response.data.existingUser.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existingUser.firstName} ${response.data.existingUser.lastName}`;
        dispatch(setUser({ ...response.data.existingUser, image: userImage }));
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("existingUser", JSON.stringify(response.data.existingUser));
      navigate("/dashboard/my-profile");
     } catch (error) {
      console.log("LOGIN API ERROR............", error)
      toast.error("Could not login");
     }
     dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function logout(navigate) {
  return (dispatch)=>{
    dispatch(setToken(null));
    dispatch(setUser(null));
    dispatch(resetCart());
    localStorage.removeItem("token");
    localStorage.removeItem("existingUser");
    toast.success("Logged Out")
    navigate('/');
  }
}

export function getPasswordResetToken(email, setEmailSent){
  return async(dispatch) =>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true));

    try {
     const response = await APIConnector("POST", RESETPASSTOKEN_API, {email});
     console.log("RESETPASSTOKEN_API RESPONSE............", response)

      console.log(response.data.success);

      if(!response.data.success){
        throw new Error(response.data.message)
      }
    
      toast.success("Mail Sent Successfully");
      setEmailSent(true);
    } catch (error) {
      console.log("RESETPASSTOKEN_API ERROR............", error)
      toast.error("Could Not Send Mail")
    }
    dispatch(setLoading(false));
     toast.dismiss(toastId);
  }
}

export function resetPassword(password, confirmPassword, token, navigate) {
  return async(dispatch)=>{
    const toastId = toast.loading("Loading in reset password")
    dispatch(setLoading(true));

    try {
      const response = await APIConnector("POST", RESETPASSWORD_API, {password, confirmPassword, token})

      console.log("RESETPASSWORD_API RESPONSE............", response)

      console.log(response.data.success);

      if(!response.data.success){
        throw new Error(response.data.message);
      }
    
      toast.success("Password Reset Successful");
      navigate('/login');

    } catch (error) {
      console.log("RESET PASSWORD TOKEN Error", error);
      toast.error("Unable To Reset Password");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}

export function sendContactDetails(firstName, lastName, email, countryCode, phoneNo, message){
  return async(dispatch) => {
    const toastId = toast.loading("Loading Contact Details");
    dispatch(setLoading(true));
    try{
      const response = await APIConnector("POST", CONTACTUS_API, 
      {firstName, lastName, email, countryCode, phoneNo, message});
      console.log("Response : ", response);
      if(!response.data.success){
        throw new Error(response.data.message);
      }
      toast.success("Contact Details Sent Successfully");
    }
    catch(error){
      console.log("Error Encountered In Sending Contact Details", error);
      toast.error("Unable to send your contact details");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
}