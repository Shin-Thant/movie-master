import React from "react";

export const WatchListSkeleton = () => {
    return (
        <div className="w-11/12 mx-auto rounded-lg bg-secondary p-5 mb-3">
            <div className="animate-pulse w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div
                    className="h-52 sm:h-44 w-4/6 mx-auto bg-gray-400 rounded-lg
            "
                ></div>
                <div className="w-full sm:w-9/12 flex flex-col gap-5 mt-5">
                    <h2 className="w-1/4 h-3 bg-gray-400 rounded-full"></h2>
                    <h2 className="w-1/2 h-3 bg-gray-400 rounded-full"></h2>
                    <div className="flex flex-col gap-2 w-full">
                        <div className="w-full h-3 bg-gray-400 rounded-full"></div>
                        <div className="w-full h-3 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="flex items-center gap-5">
                        <div className="w-1/5 h-6 bg-gray-400 rounded-md"></div>
                        <div className="w-1/5 h-6 bg-gray-400 rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
