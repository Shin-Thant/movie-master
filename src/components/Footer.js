import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { BsTwitter } from "react-icons/bs";
import { HiMail } from "react-icons/hi";
import "./footer.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <div className="footer-wrapper w-full flex justify-center pt-10 pb-20 sm:py-10 bg-secondary font-roboto">
            <div className="footer text-white w-4/5">
                <div className="top flex justify-between flex-col md:flex-row gap-8">
                    <div className="">
                        <h1 className="font-extrabold text-2xl mb-3">
                            Movie<span className="text-primary">Master</span>
                        </h1>
                        <p className="text-gray-400 font-semibold">
                            Unlimited movies & TV shows
                        </p>
                    </div>
                    {/* <div className="flex flex-1 justify-between flex-col md:flex-row gap-5 md:gap-0"> */}
                    <div className="about">
                        <h3 className="font-bold tracking-wider">ABOUT US</h3>
                        <p className="text-gray-400 font-semibold">
                            We created a website to <br />
                            watch movies and tv shows <br />
                            for free .
                        </p>
                    </div>
                    <div className="contact">
                        <h3 className="font-bold tracking-wider">CONTACT US</h3>
                        <p className="text-gray-400 font-semibold">
                            Email - moviemaster@gmail.com
                        </p>
                        <p className="text-gray-400 font-semibold">
                            Phone - 09 255 907 632
                        </p>
                    </div>
                    {/* </div> */}
                </div>
                <div className="divider bg-gray-500 my-10"></div>
                <div className="bottom flex justify-center text-2xl flex-col items-center">
                    <div className="logo flex gap-8 flex-wrap">
                        <div className="border-2 p-2 rounded-full">
                            <FaFacebookF className="text-white icons fb" />
                        </div>
                        <div className="border-2 p-2 rounded-full">
                            <FiGithub className="text-white icons git" />
                        </div>
                        <div className="border-2 p-2 rounded-full">
                            <BsTwitter className="text-white icons twitter" />
                        </div>
                        <div
                            className="border-2 p-2 rounded-full"
                            onClick={() => navigate("/contact")}
                        >
                            <HiMail className="text-white icons mail" />
                        </div>
                    </div>
                    <div className="">
                        <p className="text-base font-bold my-5">
                            {" "}
                            &copy; Copyright All rights reserved{" "}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
