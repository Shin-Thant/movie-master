import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";

export const Review = ({ author, content }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="accordion bg-secondary p-4 sm:p-5 rounded-lg mb-5">
            <div>
                <div className="autor text:lg md:text-xl font-bold flex justify-between items-center ">
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
