import React from "react";
import { AiFillStar } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeFromWatchList } from "../redux/Actions/WathListAction";
import "./watchListCard.css";
import { AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const WatchListCard = ({
    mediaType,
    id,
    img,
    name,
    rating,
    count,
    overview,
    trailer,
}) => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const removeWatchListItem = () => {
        dispatch(removeFromWatchList(id));
    };
    console.log(mediaType);

    const goDetails = () => {
        navigate(`/${mediaType}/${id}`);
    };

    return (
        <div className="w-11/12 mx-auto bg-secondary gap-5 sm:gap-0 flex flex-col sm:flex-row items-start sm:items-center justify-between py-6 px-5 sm:px-7 rounded-lg mb-6 sm:mb-5 font-roboto">
            <div className="listCard-img-container overflow-hidden rounded-lg flex justify-center">
                <img
                    src={`https://image.tmdb.org/t/p/w500${img}`}
                    alt=""
                    className="listCard-img rounded-lg "
                />
            </div>
            <div className="listCard-main-content flex flex-col gap-4">
                <div className="flex gap-3">
                    <h2 className="flex items-center gap-1 font-bold text-yellow-400">
                        <AiFillStar style={{ fontSize: "1.3rem" }} /> {rating}
                    </h2>
                    <h2>({count} ratings)</h2>
                </div>
                <h2 className="text-2xl font-bold">{name}</h2>
                <p className="text-sm">{overview}</p>
                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <a
                        href={`https://www.youtube.com/watch?v=${
                            trailer?.filter(
                                (item) => item.type === "Trailer"
                            )[0].key
                        }`}
                        target="_blank"
                        className="bg-primary shadow-primary rounded-full px-4 py-2 font-bold"
                    >
                        Watch Trailer
                    </a>
                    <button
                        onClick={removeWatchListItem}
                        className="p-3 rounded-full text-base shadow-lg ml-4"
                        style={{ background: "#414141" }}
                    >
                        <FaTrashAlt />
                    </button>
                    <button
                        onClick={goDetails}
                        className="p-3 rounded-full text-base shadow-lg"
                        style={{ background: "#414141" }}
                    >
                        <AiFillEye />
                    </button>
                </div>
            </div>
        </div>
    );
};
