import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getDetails } from "../../api/getDetails";
import "./detailspage.css";

export const Divider = () => {
    return (
        <div
            className="w-4/5 bg-secondary mx-auto rounded-full my-16"
            style={{ height: "2px" }}
        ></div>
    );
};

export const DetailsPage = () => {
    const { id } = useParams();
    console.log(id);

    const { isLoading, error, data } = useQuery(
        ["details", { id }],
        getDetails
    );
    data && console.log(data.poster_path);

    return (
        <div className="font-roboto w-full text-white bg-black py-12">
            <div className="w-4/5 h-max flex items-center justify-between mx-auto">
                <div className="bg-img-container">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                        alt=""
                    />
                </div>
                <div className="w-3/5 h-max">
                    <div className="flex items-center gap-3 mb-5">
                        {data?.genres.map((item) => (
                            <div
                                key={item.id}
                                className="cursor-default bg-primary font-semibold text-base rounded-full px-4 py-1"
                            >
                                {item.name}
                            </div>
                        ))}
                    </div>
                    <h2 className="text-4xl font-bold">
                        {data?.original_title}
                    </h2>
                    <h3></h3>
                </div>
            </div>

            <Divider />

            <div></div>
        </div>
    );
};
