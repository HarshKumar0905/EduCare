import React, { useState } from "react";
import { sidebarLinks } from "../../../Data/dashboard-links";
import { logout } from "../../../Services/Operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { VscSignOut } from "react-icons/vsc"
import ConfirmationModal from "../../Common/ConfirmationModal";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const {user, loading : profileLoading} = useSelector((state) => state.Profile);
    const {loading : authLoading} = useSelector((state) => state.Auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){
        return(
            <div className="spinner"></div>
        );
    }

    return(
        <>
        <div className='flex min-w-[220px] flex-col border-r-[2px] border-richblack-700
        bg-richblack-800 md:py-10 overflow-auto'>
            <div className="flex md:min-h-[222px] flex-col
            h-[calc[100vh-3.5rem] bg-richblack-800 py-10">
                <div className='flex flex-col'>
                {
                    sidebarLinks.map((link) => {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (<SidebarLink link={link} iconName = {link.icon}/>)
                    })
                }
                </div>

                <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />

                <div className="flex flex-col">
                    <SidebarLink link={{name:"Settings", path:"/dashboard/settings"}} iconName="VscSettingsGear" />
                    <button onClick={() => {
                    setConfirmationModal({
                        text1: "Are you sure?",
                        text2: "You will be logged out of your account.",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null)
                    })}}
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                    >
                        <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                        </div>
                    </button>
                </div>
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </>
    );
}

export default Sidebar;