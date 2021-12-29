import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getPeopleDetails } from "../../api/getPeopleDetails";
import "./castProfile.css";

export const CastProfile = () => {
    const { id } = useParams();
    console.log(id);

    const { isLoading, error, data } = useQuery(
        ["person", { id }],
        getPeopleDetails
    );

    return (
        <div className="py-32 text-white bg-black w-full relative font-roboto">
            {data?.profile_path && data?.biography ? (
                <div className="w-11/12 sm:w-4/5 s_tablet:w-11/12 lg:w-4/5 mx-auto flex flex-col s_tablet:flex-row justify-evenly gap-14 s_tablet:gap-5 px-2 sm:px-0">
                    {isLoading ? (
                        <div className="animate-pulse bg-gray-300 rounded-xl cast-details-img-skeleton"></div>
                    ) : data?.profile_path ? (
                        <div className="cast-profile-img rounded-xl relative">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${data?.profile_path}`}
                                alt=""
                                className="rounded sm:rounded-xl"
                            />
                        </div>
                    ) : (
                        <div className="cast-profile-img rounded-xl flex justify-center items-center bg-gray-300 font-bold text-lg">
                            Image is not available!
                        </div>
                    )}

                    <div className="cast-profile-content">
                        {isLoading ? (
                            <div className="animate-pulse w-full">
                                <div className="bg-gray-300 w-1/3 mb-4 h-3 rounded-full"></div>
                                <div className="bg-gray-300 w-1/2 mb-7 h-3 rounded-full"></div>
                                <div className="bg-gray-300 w-1/3 mb-7 h-3 rounded-full"></div>
                                <div className="bg-gray-300 w-1/3 mb-7 h-3 rounded-full"></div>
                                <div className="w-full rounded-full">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                        <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                        <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                    </div>
                                    <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
                                    <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                        <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                        <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                    </div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                        <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                    </div>
                                    <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
                                    <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                        <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-4 font-bold mb-3 s_tablet:mb-5 popularity">
                                    <div className="text-base text-gray-300">
                                        Popularity
                                    </div>
                                    <div className="border-2 border-secondary bg-secondary text-white py-1 px-5 rounded relative popularity-btn overflow-hidden cursor-default">
                                        <span></span>
                                        {data?.popularity}
                                    </div>
                                </div>
                                <div className="text-3xl text-primary font-bold mb-3 s_tablet:mb-5 cast-details-name">
                                    {data?.name}
                                </div>
                                <div className="mb-1 date-of-birth">
                                    {data?.deathday ? (
                                        <div className="flex items-center gap-2">
                                            From <h2>{data?.birthday}</h2> to
                                            <h2>{data?.deathday}</h2>
                                        </div>
                                    ) : (
                                        <div className="text-gray-300 font-medium flex items-center gap-2">
                                            <span>Date of birth</span> -
                                            <span className="font-bold text-white text-lg">
                                                {data?.birthday}
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="mb-6 text-gray-300 font-medium birth-place">
                                    Born in{" "}
                                    <span className="text-white font-bold text-lg">
                                        {data?.place_of_birth}
                                    </span>
                                </div>
                                <div className="text-gray-200 bio">
                                    {data?.biography}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <div
                    className="flex justify-center items-center w-11/12 mx-auto text-lg font-bold"
                    style={{ height: "80vh" }}
                >
                    Your request is not available!
                </div>
            )}
        </div>
    );
};
