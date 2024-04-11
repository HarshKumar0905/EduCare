import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Core/Dashboard/Sidebar";
import Footer from "../Components/Common/Footer";

const Dashboard = () => {
    const {loading : authLoading} = useSelector((state) => state.Auth);
    const {loading : profileLoading} = useSelector((state) => state.Profile);
    if(profileLoading || authLoading){
        return(
            <div className="spinner"></div>
        );
    }

    return(
        <>
        <div className="flex flex-col md:flex md:flex-row min-h-[51rem] setBackground">
            <Sidebar/>
            <div className="w-full">
                <div className="mx-auto w-11/12 max-w-[1000px]">
                    <Outlet/>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Dashboard;