import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import { LuFolderEdit } from "react-icons/lu";

const MyProfile = () => {
    const {user} = useSelector((state) => state.Profile);
    const navigate = useNavigate();

    return(
        <div className="w-full my-20">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                My Profile
            </h1>

            <div className="flex items-center justify-between rounded-md 
            border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12"> 
                <div className="flex flex-col md:flex md:flex-row gap-y-4 items-center gap-x-4">
                    <img 
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover"
                    />
                    <div className="space-y-1">
                        <p className="text-2xl font-semibold text-richblack-5">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-300">
                            {user?.email}
                        </p>
                    </div>
                </div>
                <IconBtn 
                    text="Edit"
                    onClick={() => {
                      navigate("/dashboard/settings");
                    }}
                >
                    <LuFolderEdit className="text-2xl"/>
                </IconBtn>
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md 
            border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-2xl font-semibold text-richblack-5">
                        About
                    </p>
                    <IconBtn
                    text="Edit"
                    onClick={() => {
                        navigate("/dashboard/settings");
                    }}
                    >
                        <LuFolderEdit className="text-2xl"/>
                    </IconBtn>
                </div>
                <p className={`${
                user?.additionalDetails?.about
                ? "text-richblack-5"
                : "text-richblack-400"
                } text-sm font-medium`}
                >
                    {user?.additionalDetails?.about ?? 
                    "Write Something About Yourself"}
                </p>
            </div>

            <div className="flex flex-col gap-y-10 rounded-md border-[1px]
            border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-2xl font-semibold text-richblack-5">
                        Personal Details
                    </p>
                    <IconBtn
                    text="Edit"
                    onClick={() => {
                        navigate("/dashboard/settings");
                    }}
                    >
                        <LuFolderEdit className="text-2xl"/>
                    </IconBtn>
                </div>

                <div className="flex md:gap-0 gap-4 max-w-[500px] justify-between">
                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-md text-richblack-100">First Name</p>
                        <p className="text-sm font-medium text-richblack-5">{user?.firstName}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-md text-richblack-100">Email</p>
                        <p className="text-sm font-medium text-richblack-5">{user?.email}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-md text-richblack-100">Gender</p>
                        <p className={`${
                        user?.additionalDetails?.gender
                        ? "text-richblack-5"
                        : "text-richblack-400"
                        } text-sm font-medium`}>{user?.additionalDetails?.gender ??
                        "Add Gender"}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5">
                    <div>
                        <p className="mb-2 text-md text-richblack-100">Last Name</p>
                        <p className="text-sm font-medium text-richblack-5">{user?.lastName}</p>
                    </div>
                    <div>
                        <p className="mb-2 text-md text-richblack-100">Phone Number</p>
                        <p className={`${
                        user?.additionalDetails?.contactNumber
                        ? "text-richblack-5"
                        : "text-richblack-400"
                        } text-sm font-medium`}>
                            {user?.additionalDetails?.contactNumber ?? 
                            "Add Contact Number"}
                        </p>
                    </div>
                    <div>
                        <p className="mb-2 text-md text-richblack-100">Date Of Birth</p>
                        <p className={`${
                        user?.additionalDetails?.dateOfBirth
                        ? "text-richblack-5"
                        : "text-richblack-400"
                        } text-sm font-medium`}>
                            {user?.additionalDetails?.dateOfBirth ??
                            "Add Date Of Birth"}
                        </p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;