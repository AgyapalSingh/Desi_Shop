import React from 'react';
import Layout from "./../components/Layout/Layout";

const About = () => {
    return (
        <Layout title={"About us - Desi Shop"}>
            <div className='row contactus'>
                <div className='col-md-6 contactus-img-div'>
                    <img src='/img/about.jpeg' alt='contactus' style={{ width: "100%", height: "80%" }} />
                </div>

                <div className='col-md-1'>

                </div>

                <div className='col-md-4 contact-us'>
                    <h1 className='bg-dark  text-white text-center mt-5'>About US</h1>
                    <p className='text-justify mt-2'>
                        Welcome to Desi Shop, your ultimate destination for all things desi! We are an ecommerce website dedicated to bringing you a wide range of products that celebrate the vibrant and rich culture of South Asia.
                        <br />
                        <br />
                        Join us on this exciting journey as we bring the flavors, colors, and traditions of South Asia right to your doorstep. Explore our collection at Desi Shop and let us help you discover the magic of the subcontinent.
                        <br />
                        <br />
                        Experience the best of desi culture. Shop at Desi Shop today!
                    </p>

                </div>
            </div>
        </Layout>
    )
};

export default About;