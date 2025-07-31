import React from "react";
import {Link, matchPath} from "react-router-dom";
import logo from '../../Assets/Logo/Logo-Full-Light.png';
import {NavBarLinks} from '../../Data/navbar-links';
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import ProfileDropDown from '../Core/Auth/ProfileDropDown';
import { APIConnector } from "../../Services/APIConnector";
import {categories} from "../../Services/API";
import { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";

const NavLinks = ({matchRoute, token, subLinks, user, totalItems}) => {
    return(
        <div className="flex flex-col md:flex md:flex-row justify-between items-start md:items-center w-full gap-y-4">

                    <ul className='flex flex-col md:flex md:flex-row gap-x-6 text-richblack-25'>
                    {
                        NavBarLinks.map((link, index) => {
                            return <li key={index}>
                            {
                                link.title === 'Catalog' ?
                                (<div className='relative flex items-center gap-1 group z-50'>
                                    <p>{link.title}</p>
                                    <FaAngleDown/>
                                    <div className={`invisible absolute md:left-[50%] 
                                    md:translate-x-[-49%] ${subLinks?.length ? "group-hover:visible" : "invisible"}
                                    group-hover:top-[42px] top-[84px] z-50 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
                                    transition-all duration-200 lg:w-[300px] opacity-0 group-hover:opacity-100`}>
                                        <div className='absolute left-[50%] top-0
                                        translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                                        {
                                            subLinks?.length ? (
                                                subLinks.map((subLink, index) => (
                                                    <Link key={index} className='rounded-lg bg-transparent py-4 pl-4
                                                    hover:bg-richblack-50 transition-all duration-200'
                                                    to={`catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}>
                                                        <p>{subLink.name}</p>
                                                    </Link>
                                                ))
                                                
                                            ) : (<div></div>)
                                        }                                  
                                    </div>
                                </div>) : 
                                (<Link to={link.path}>
                                  <p className={`
                                  ${matchRoute(link?.path)?'text-[#00b0f0]':'text-richblack-25'}`}>
                                  {link.title}
                                  </p>
                                </Link>)
                            }
                            </li>
                        })
                    }
                    </ul>

                <div className='flex flex-col md:flex md:flex-row items-start gap-x-4 gap-y-4'>
                {
                    user && user.accountType !== 'Instructor' && (
                        <Link to='/dashboard/cart' className='relative'>
                            <TiShoppingCart className='text-3xl text-richblack-100'/>
                            {
                                totalItems > 0 && (
                                    <span className='absolute bottom-4 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-caribbeangreen-500
                                    text-center text-xs font-bold text-blue-800'>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                } 
                {
                    token === null && (
                        
                        <Link to='/login'>
                            <button className='border border-richblack-700
                            bg-richblack-800 px-[12px] py-[6px]
                            text-richblack-100 rounded-lg transition-all duration-200
                            hover:scale-95 hover:bg-richblack-900'>
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        
                        <Link to='/signup' className='border border-richblack-700 
                        bg-richblack-800 px-[12px] py-[6px]
                        text-richblack-100 rounded-lg transition-all duration-200
                        hover:scale-95 hover:bg-richblack-900'>
                            <button>
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && (
                        <ProfileDropDown/>
                    )
                }
                </div>
        </div>
    )
}

const Navbar = () => {
    const {token} = useSelector((state) => state.Auth);
    const {user} = useSelector((state) => state.Profile);
    const {totalItems} = useSelector((state) => state.Cart);
    const [subLinks, setSubLinks] = useState([]);
    const [open, setOpen] = useState(false);

    const fetchSubLinks =  async () => {
        try{
            const res = await APIConnector('GET', categories.CATEGORIES_API);
            setSubLinks(res.data.data);
        }
        catch(error){
            console.log('Could not fetch the catalog list');
        }
    }
    
    useEffect(() => {
        fetchSubLinks();
    }, []);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }

    return(
        <div className='flex items-center justify-center border border-b-[2px] border-b-richblack-700 h-fit
        pb-4 md:pb-0'>
            <div className='flex flex-col w-11/12 max-w-maxContent md:items-center items-start md:justify-between
            md:flex md:flex-row'>
                <Link to='/'>
                    <img src={logo} width={160} height={32} loading='lazy'/>
                </Link>

                <div className="text-richblack-5 text-3xl absolute right-6 top-6
                md:hidden" onClick={() => setOpen(!open)}>
                {open ? <CgClose/> : <HiMenu/>}
                </div>
                <div className={`w-[65%] ${open ? 'h-[208px] md:h-0' : 'translate-y-4 md:translate-y-0 opacity-0 md:opacity-100'}
                transition-all duration-500 h-0 flex`}>
                <NavLinks matchRoute={matchRoute} token={token} subLinks={subLinks}
                 user={user} totalItems={totalItems}/>
                </div>
            </div>
        </div>
    );
}

export default Navbar;