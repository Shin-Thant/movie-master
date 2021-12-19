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
        <div className="home-intro mx-auto text-white ">
            {data && (
                <div className="w-full s_mobile:10/12 sm:w-9/12 md:w-3/5 lg:w-7/12 h-full flex flex-col justify-start s_base:justify-center s_base:px-6 s_mobile:px-10 sm:px-16 s_tablet:px-20 gap-5">
                    <div className="s_base:text-base sm:text-lg">
                        Duration - {Math.floor(data.runtime / 60)}hr{" "}
                        {data.runtime % 60}m
                    </div>
                    <div className="flex items-center gap-3">
                        <h2 className="flex items-center font-bold gap-1 text-lg">
                            <AiFillStar style={{ color: "gold" }} />{" "}
                            {data.vote_average}
                        </h2>{" "}
                        -
                        <h2 className="text-base font-semibold">
                            {data.tagline}
                        </h2>
                    </div>
                    <h1 className="font-extrabold text-4xl ">{data.title}</h1>
                    <h4 className="s_base:text-base sm:text-lg">
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
