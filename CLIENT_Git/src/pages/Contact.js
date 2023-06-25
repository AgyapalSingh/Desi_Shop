import React from 'react';
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi"

const Contact = () => {
    return (
        <Layout title={"Contact Us - Desi Shop"}>
            <div className='row contactus'>
                <div className='col-md-6 contactus-img-div'>
                    <img src='/img/Cont_Us.jpg' alt='contactus' style={{ width: "100%", marginTop: "6vh", marginLeft: "20px" }} />
                </div>
                <div className='col-md-1'>

                </div>
                <div className='col-md-4 contact-us'>
                    <h1 className='bg-dark text-white text-center mt-5'>CONTACT US</h1>
                    <p className='text-justify mt-2'>
                        Any Query and Info about product, feel free to call. We are 24/7 availiable
                    </p>
                    <p className='mt-3'>
                        <BiMailSend /> : www.help@desishop.com
                    </p>
                    <p className='mt-3'>
                        <BiPhoneCall /> : 99999-88888
                    </p>
                    <p className='mt-3'>
                        <BiSupport /> : 1800-0000-0001 (toll free)
                    </p>
                </div>
            </div>
        </Layout>
    )
};

export default Contact;