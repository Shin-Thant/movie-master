import React from "react";
import "./trendsSkeleton.css";

export const TrendsSkeleton = () => {
    return (
        <div className="trends-skeleton text-white rounded-lg py-5 px-2">
            <div className="animate-pulse w-full">
                <div
                    className="h-64 w-11/12 mx-auto bg-gray-400 mb-3 px-4 rounded-lg
            "
                ></div>
                <div className="px-2">
                    <h2 className="w-1/2 h-3 bg-gray-400 rounded-full mb-3"></h2>
                    <div className="flex items-center justify-between">
                        <div className="w-9/12 h-3 bg-gray-400 rounded-full"></div>
                        <div className="w-1/5 h-3 bg-gray-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
