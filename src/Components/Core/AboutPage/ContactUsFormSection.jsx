import React from "react";
import ContactUsForm from "../../ContactPage/ContactUsForm";
import { useInView } from "react-intersection-observer";

const ContactUsFormSection = () => {
    const [ref, inView] = useInView();

    return(
        <div className='mx-auto mb-16'>
            <h1 className={`text-center text-4xl font-semibold
            ${inView ? 'animate-button' : 'opacity-0'}`} ref={ref}>
                Get in Touch
            </h1>
            <p className='text-center text-richblack-300 mt-3'>
                We'd love to here for you, Please fill out this form.
            </p>
            <div className='mt-7 mx-auto'>
                <ContactUsForm/>
            </div>
        </div>
    );
}

export default ContactUsFormSection;