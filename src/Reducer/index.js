import { combineReducers } from "@reduxjs/toolkit";
import AuthReducer from "../Slices/AuthSlice";
import ProfileReducer from "../Slices/ProfileSlice";
import CartReducer from "../Slices/CartSlice";
import CourseReducer from "../Slices/CourseSlice";
import ViewCourseReducer from "../Slices/ViewCourseSlice";

const rootReducer = combineReducers({
    Auth : AuthReducer,
    Profile : ProfileReducer,
    Cart : CartReducer,
    Course : CourseReducer,
    ViewCourse : ViewCourseReducer
});

export default rootReducer;