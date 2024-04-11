import React from "react";
import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { resetCourseState } from "../../../Slices/CourseSlice";

const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return(
        <NavLink
            to={link.path}
            onClick={dispatch(resetCourseState())}
            className={`${matchRoute(link.path) ? "bg-[#00b0f039] text-[#00b0f0]"
            : "bg-opacity-0 text-richblack-300"} relative px-8 py-2 text-sm font-medium
            transition-all duration-200`}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.15rem] bg-[#00b0f0] ${
            matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>
            <div className="flex items-center gap-x-2">
                <Icon className="text-lg"/>
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
}

export default SidebarLink;