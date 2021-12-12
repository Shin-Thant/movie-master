import React from "react";
import { useQuery } from "react-query";
import { getMovieForHome } from "../api/getMovieForHome";
import "./homePageIntro.css";
import { BsFillPlayFill, BsPlusLg } from "react-icons/bs";

export const HomePageIntro = () => {
    const { isLoading, error, data } = useQuery(
        "movieForHome",
        getMovieForHome,
        { staleTime: 600000 }
    );

    return (
        <div className="home-intro mx-auto text-white ">
            {data && (
                <div className="w-full s_mobile:10/12 sm:w-9/12 md:w-3/5 lg:w-7/12 h-full flex flex-col justify-start s_base:justify-center s_base:px-6 s_mobile:px-10 sm:px-16 s_tablet:px-20 gap-6">
                    <div className="s_base:text-base sm:text-lg">
                        Duration - {data.runtime}m
                    </div>
                    <h1 className="font-extrabold text-4xl ">{data.title}</h1>
                    <h4 className="s_base:text-base sm:text-lg">
                        {data.overview}
                    </h4>
                    <div className="w-full flex flex-wrap s_base:items-start flex-col s_base:flex-row s_mobile:flex-row sm:flex-col md:flex-row items-center gap-6">
                        <a
                            href={`${data.homepage}`}
                            target="_blank"
                            className="shadow-primary bg-primary s_base:px-5 sm:px-8 s_base:py-2.5 sm:py-3 rounded-full font-medium text-sm flex items-center justify-between s_base:gap-2 sm:gap-3"
                        >
                            <BsFillPlayFill
                                style={{
                                    fontSize: "23px",
                                }}
                            />{" "}
                            VIEW DETAILS
                        </a>
                        <button className="s_base:px-5 sm:px-8 s_base:py-2.5 sm:py-3 rounded-full text-white bg-secondary font-medium text-sm flex items-center justify-between s_base:gap-2 sm:gap-3">
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