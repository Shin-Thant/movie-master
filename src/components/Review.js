import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";

export const Review = ({ author, content }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="accordion bg-secondary px-4 py-2 sm:py-3 sm:px-3 rounded-lg mb-5 w-full">
            <div>
                <div className="autor text-base md:text-lg font-bold flex justify-between items-center ">
                    <span>{author}</span>
                    <span
                        className="cursor-pointer p-1"
                        onClick={() => setActive(!active)}
                    >
                        <HiPlus
                            style={{ fontSize: "25px" }}
                            className={`plus ${active && "activePlus"}`}
                        />
                    </span>
                </div>
                <div
                    className={`content text-gray-300 break-words ${
                        active && "activeAccordion"
                    }`}
                >
                    {content}
                </div>
            </div>
        </div>
    );
};
