import { FaSearch } from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { RiPlayList2Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { RiContactsLine } from "react-icons/ri";
import "./navbar.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNavLink } from "../redux/Actions/NavbarAction";

const Navbar = () => {
    const [current, setCurrent] = useState("explore");

    const { activeLink } = useSelector((state) => state.navbar);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const goExplore = () => {
        dispatch(addNavLink("explore"));
        setCurrent("explore");
        navigate("/");
    };
    const goList = () => {
        dispatch(addNavLink("watchlist"));
        setCurrent("watchlist");
        navigate("/watchList");
    };
    const goContact = () => {
        dispatch(addNavLink("contact"));
        setCurrent("contact");
        navigate("/contact");
    };
    const goSearch = () => {
        dispatch(addNavLink("search"));
        setCurrent("search");
        navigate("/search");
    };

    return (
        <div className="navbar-wrapper font-roboto">
            <nav className="top-nav w-full flex justify-between items-center text-white absolute top-0 left-0 right-0 z-50">
                <div className="flex justify-between items-center w-full s_base:px-5 md:px-8">
                    <button
                        onClick={() => navigate("/")}
                        className="logo flex items-center"
                    >
                        <h1 className="text-2xl font-extrabold">
                            MOVIE<span className="text-primary">MASTER</span>{" "}
                        </h1>
                    </button>
                    <ul className="hidden sm:flex gap-10 items-center cursor-pointer">
                        <li>
                            <button
                                onClick={goExplore}
                                className={`font-bold uppercase text-sm ${
                                    activeLink === "explore" && "activeTop"
                                }`}
                            >
                                explore
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={goList}
                                className={`font-bold uppercase text-sm ${
                                    activeLink === "watchlist" && "activeTop"
                                }`}
                            >
                                watchlist
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={goContact}
                                className={`font-bold uppercase text-sm ${
                                    activeLink === "contact" && "activeTop"
                                }`}
                            >
                                Contact
                            </button>
                        </li>
                        <li>
                            <button
                                className={`p-2 rounded-full font-bold flex items-center gap-2 transition-all duration-200 ease-in ${
                                    activeLink === "search"
                                        ? "bg-primary text-white"
                                        : "bg-gray-50 text-primary"
                                }`}
                                onClick={goSearch}
                            >
                                <FaSearch />
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav
                className="bottom-nav text-white fixed bottom-0 w-full z-50 inline-flex sm:hidden justify-center z-50"
                style={{ background: "#141414" }}
            >
                <div className="pb-5">
                    <ul className="menu flex items-center">
                        <li className="md:inline-flex md:w-auto px-0 py-2 md:px-10 group relative mt-1 md:mt-0 group">
                            <div
                                className="menu-item flex justify-center cursor-pointer"
                                onClick={goExplore}
                            >
                                <MdTravelExplore
                                    className={`btn-icon h-8 w-8 mx-auto shadow-lg bg-gray-600 p-2 rounded-xl transition-all duration-200 ease-in-out transform ${
                                        activeLink === "explore" &&
                                        "bg-primary scale-110"
                                    }`}
                                />
                                <p
                                    className={`btn-text mt-1 ${
                                        activeLink === "explore"
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } font-extrabold text-xs transition-all duration-300 ease-in-out text-white absolute top-10`}
                                >
                                    Explore
                                </p>
                            </div>
                        </li>
                        <li className="md:inline-flex md:w-auto px-0 py-2 md:px-10 group relative mt-1 md:mt-0 group">
                            <div
                                className="menu-item flex justify-center cursor-pointer"
                                onClick={goSearch}
                            >
                                <FaSearch
                                    className={`btn-icon h-8 w-8 mx-auto shadow-lg bg-gray-600 p-2 rounded-xl transition-all duration-200 ease-in-out transform ${
                                        activeLink === "search" &&
                                        "bg-primary scale-110"
                                    }`}
                                />
                                <p
                                    className={`btn-text mt-1 ${
                                        activeLink === "search"
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } font-extrabold text-xs transition-all duration-300 ease-in-out text-white absolute top-10`}
                                >
                                    Search
                                </p>
                            </div>
                        </li>
                        <li className="md:inline-flex md:w-auto px-0 py-2 md:px-10 group relative mt-1 md:mt-0 group">
                            <div
                                className="menu-item flex justify-center cursor-pointer"
                                onClick={goList}
                            >
                                <RiPlayList2Fill
                                    className={`btn-icon h-8 w-8 mx-auto shadow-lg bg-gray-600 p-2 rounded-xl transition-all duration-200 ease-in-out transform ${
                                        activeLink === "watchlist" &&
                                        "bg-primary scale-110"
                                    }`}
                                />
                                <p
                                    className={`btn-text mt-1 ${
                                        activeLink === "watchlist"
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } font-extrabold text-xs transition-all duration-300 ease-in-out text-white absolute top-10`}
                                >
                                    List
                                </p>
                            </div>
                        </li>
                        <li className="md:inline-flex md:w-auto px-0 py-2 md:px-10 group relative mt-1 md:mt-0 group">
                            <div
                                className="menu-item flex justify-center cursor-pointer"
                                onClick={goContact}
                            >
                                <RiContactsLine
                                    className={`btn-icon h-8 w-8 mx-auto shadow-lg bg-gray-600 p-2 rounded-xl transition-all duration-200 ease-in-out transform ${
                                        activeLink === "contact" &&
                                        "bg-primary scale-110"
                                    }`}
                                />
                                <p
                                    className={`btn-text mt-1 ${
                                        activeLink === "contact"
                                            ? "opacity-100"
                                            : "opacity-0"
                                    } font-extrabold text-xs transition-all duration-300 ease-in-out text-white absolute top-10`}
                                >
                                    Contact
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
