import React from "react";
import { BsArrowUp } from "react-icons/bs";
import "./scrollTopTop.css";

const ScrollToTop = () => {
    return (
        <button
            className="text-white rounded-full p-2 border-2 text-white z-50 up"
            onClick={() => {
                window.scrollTo("0", "0");
            }}
        >
            <BsArrowUp className="text-2xl" />
        </button>
    );
};

export default ScrollToTop;
