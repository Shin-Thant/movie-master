import React, { useState } from "react";
import "./moviecard.css";
import { AiFillStar, AiFillHeart } from "react-icons/ai";
import { BsFillPlayFill, BsPlusLg } from "react-icons/bs";

export const MovieCard = ({ img, name, rating, count }) => {
    const [favorite, setFavorite] = useState(false);

    return (
        <div className="card text-white rounded-lg py-4">
            <div
                className="h-3/4 w-full overflow-hidden flex justify-center card-img-container mb-3 px-4
            "
            >
                <div className="card-hover px-4 py-2 flex flex-col s_base:flex-row md:flex-row justify-center items-center gap-4">
                    <button className="bg-primary text-semibold text-sm rounded-full px-3 py-2 flex items-center gap-1 shadow-primary">
                        <BsFillPlayFill style={{ fontSize: "22px" }} />
                        VIEW DETAILS
                    </button>

                    <button className="bg-white text-primary text-semibold text-sm rounded-full px-3 py-3 flex items-center gap-2">
                        <BsPlusLg style={{ fontSize: "15px" }} />
                    </button>
                </div>
                <img src={`https://image.tmdb.org/t/p/w500${img}`} alt="" />
            </div>
            <div className="px-2">
                <h2 className="font-bold text-lg mb-1">{name}</h2>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h4 className="flex items-center text-yellow-500 gap-1 font-bold">
                            <AiFillStar style={{ fontSize: "18px" }} /> {rating}
                        </h4>
                        <h4>({count} ratings)</h4>
                    </div>
                    <div
                        className={
                            favorite
                                ? "text-primary cursor-pointer p-1"
                                : "text-gray-500 cursor-pointer p-1"
                        }
                        onClick={() => setFavorite(!favorite)}
                    >
                        <AiFillHeart style={{ fontSize: "20px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};
