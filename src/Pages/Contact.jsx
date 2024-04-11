import React from 'react'
import { BsFillChatRightDotsFill } from 'react-icons/bs';
import { BsGlobeAmericas } from 'react-icons/bs';
import { IoIosCall } from 'react-icons/io';
import ContactUsForm from '../Components/ContactPage/ContactUsForm';
import Footer from '../Components/Common/Footer';
import { useInView } from 'react-intersection-observer';

const ContactPage = () => {
    const [ref, inView] = useInView();
    const contactData = [
        {
            title:"Chat on us",
            desc:"Our friendly team is here to help.",
            address:"info@educare.com"
        },
        {
            title:"Visit us",
            desc:"Come and say hello at our office HQ.",
            address:"Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
        },
        {
            title:"Call us",
            desc:"Mon - Fri From 8am to 5pm",
            address:"+123 456 7869"
        },
    ]
  return (
    <div className='setBackground'>
        <div className='mx-auto my-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row'>
            <div className='lg:w-[40%]'>
                <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
                    {contactData.map((data,index)=>(
                        <div className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' key={index}>
                            <div  className='flex flex-row items-center gap-3'>
                                {(index===0 && <BsFillChatRightDotsFill className=' h-6 w-6'/>)}
                                {(index===1 && <BsGlobeAmericas className=' h-6 w-6'/>)}
                                {(index===2 && <IoIosCall className=' h-6 w-6'/>)}
                                <h1 className="text-lg font-semibold text-richblack-5">{data.title}</h1>
                            </div>
                                <p className="font-medium">{data.desc}</p>
                                <p className="font-semibold">{data.address}</p>
                            
                        </div>
                    ))}
                </div>
            </div>

            <div className='lg:w-[60%] bg-richblack-900'>
                <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
                    <h1 ref={ref} className={`text-4xl leading-10 font-semibold text-richblack-5
                    ${inView ? 'animate-button' : 'opacity-0'}`}>Got a Idea? We've got the skills. Let's team up</h1>
                    <p className="">Tell us more about yourself and what you're got in mind.</p>
                    <div className=' mt-7'>
                        <ContactUsForm/> 
                    </div>
                </div>

            </div>
        </div>
        
        <Footer/>
    </div>
  )
}

export default ContactPage;