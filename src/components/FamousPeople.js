import React from "react";
import { useNavigate } from "react-router-dom";
import "./famousPeople.css";

export const FamousPeople = ({ id, img, name }) => {
    const navigate = useNavigate();

    return (
        <div className="people">
            <div className="people-img rounded-lg overflow-hidden mb-3 relative">
                <div className="w-full flex flex-col justify-center items-center text-white font-extrabold view-profile">
                    <button
                        onClick={() => navigate(`/people/${id}`)}
                        className="rounded-full bg-primary shadow-primary px-3 py-2"
                    >
                        View Profile
                    </button>
                </div>
                <img src={`https://image.tmdb.org/t/p/w500${img}`} />
            </div>
            <h2 className="text-center text-lg font-bold">{name}</h2>
        </div>
    );
};
