import React from "react";
import { useQuery } from "react-query";
import { getMovieForHome } from "../api/getMovieForHome";
import "./homePageIntro.css";
import { BsFillPlayFill, BsPlusLg } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWatchList } from "../redux/Actions/WathListAction";

export const HomePageIntro = () => {
    const dispatch = useDispatch();

    const { isLoading, error, data } = useQuery(
        "movieForHome",
        getMovieForHome,
        { staleTime: 600000 }
    );

    const navigate = useNavigate();

    const goDetails = () => {
        navigate(`/movie/${data.id}`);
    };

    const addToList = () => {
        dispatch(addToWatchList("movie", data.id));
    };

    // *Convert minutes into hours and minutes

    return (
        <div className="home-intro mx-auto text-white w-full py-20 sm:py-0 flex flex-col justify-start s_base:justify-center relative z-10 relative">
            {data && (
                <div className="home-intro-content h-max mt-10 s_base:px-5 s_mobile:px-10 sm:px-16 s_tablet:px-20">
                    <div className="s_base:text-base sm:text-lg mb-2 md:mb-3">
                        Duration - {Math.floor(data.runtime / 60)}hr{" "}
                        {data.runtime % 60}m
                    </div>
                    <div className="flex items-center gap-3 mb-2 md:mb-3">
                        <h2 className="flex items-center font-bold gap-1 text-lg">
                            <AiFillStar style={{ color: "gold" }} />{" "}
                            {data.vote_average}
                        </h2>{" "}
                        -
                        <h2 className="text-base font-semibold">
                            {data.tagline}
                        </h2>
                    </div>
                    <h1 className="font-extrabold text-4xl mb-3 sm:mb-4">
                        {data.title}
                    </h1>
                    <h4 className="s_base:text-base sm:text-lg mb-4 sm:mb-5">
                        {data.overview}
                    </h4>
                    <div className="w-full flex flex-wrap s_base:items-start flex-col s_base:flex-row s_mobile:flex-row sm:flex-col md:flex-row items-center gap-6">
                        <button
                            onClick={goDetails}
                            className="cursor-pointer uppercase shadow-primary bg-primary s_base:px-5 sm:px-8 s_base:py-2.5 sm:py-3 rounded-full font-medium text-sm flex items-center justify-between s_base:gap-2 sm:gap-3"
                        >
                            <BsFillPlayFill
                                style={{
                                    fontSize: "23px",
                                }}
                            />{" "}
                            View Details
                        </button>
                        <button
                            onClick={addToList}
                            className="s_base:px-5 sm:px-8 s_base:py-2.5 sm:py-3 rounded-full text-white bg-secondary font-medium text-sm flex items-center justify-between s_base:gap-2 sm:gap-3"
                        >
                            <BsPlusLg
                                style={{
                                    fontSize: "13px",
                                }}
                            />{" "}
                            ADD TO LIST
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
