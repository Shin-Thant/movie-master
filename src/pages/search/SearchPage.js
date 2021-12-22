import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { MovieCard } from "../../components/MovieCard";
import { Skeleton } from "../../components/Skeleton";
import { addNavLink } from "../../redux/Actions/NavbarAction";
import {
    getSearchData,
    removeSearchData,
} from "../../redux/Actions/SearchAction";

export const SearchPage = () => {
    const [name, setName] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addNavLink("search"));
    }, []);

    const { loading, data, error } = useSelector((state) => state.search);

    useEffect(() => {
        if (name.length < 1) {
            removeSearchData();
        }
    }, [name]);

    const search = (e) => {
        setName(e.target.value);
        dispatch(getSearchData(e.target.value));
    };

    return (
        <div className="font-roboto bg-black text-white w-full pt-24 pb-32">
            <div className="w-4/5 mx-auto">
                <div className="w-full bg-secondary rounded-full flex items-center px-5 py-2 gap-4 mb-16">
                    <FiSearch className="text-xl text-gray-400" />
                    <input
                        value={name}
                        onChange={search}
                        className=" border-0 outline-none bg-transparent w-full"
                        type="text"
                        placeholder="Search anything you like..."
                    />
                </div>

                <div
                    className={`w-full flex flex-wrap justify-center gap-x-3 gap-y-6 ${
                        data.length < 1 && "items-center"
                    }`}
                    style={{ minHeight: "50vh" }}
                >
                    {loading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                            <Skeleton key={item} />
                        ))
                    ) : data?.results?.length ? (
                        data?.results?.map((item, index) => (
                            <MovieCard
                                key={index}
                                mediaType={item.name ? "tv" : "movie"}
                                id={item.id}
                                img={item.poster_path}
                                name={item.name ? item.name : item.title}
                                rating={item.vote_average}
                                count={item.vote_count}
                                overview={item.overview}
                            />
                        ))
                    ) : (
                        <div className="h-full w-full flex justify-center items-center text-lg font-bold">
                            {name
                                ? `There is no movies or series like ${name}`
                                : "Search anything you like!"}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
