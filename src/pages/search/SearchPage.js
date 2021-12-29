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
import "./searchpage.css";
import { BiMoviePlay } from "react-icons/bi";
import { BsCollectionPlayFill, BsFillPersonFill } from "react-icons/bs";
import { PeopleCard } from "../../components/PeopleCard";

export const SearchPage = () => {
    const [name, setName] = useState("");

    const [active, setActive] = useState("movie");

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
                <div className="w-full bg-secondary rounded-full flex items-center px-5 py-2 gap-4 mb-10">
                    <FiSearch className="text-xl text-gray-400" />
                    <input
                        value={name}
                        onChange={search}
                        className=" border-0 outline-none bg-transparent w-full"
                        type="text"
                        placeholder="Search anything you like..."
                    />
                </div>

                <div className="flex items-center justify-evenly mb-11 search-filter pb-5">
                    <div
                        onClick={() => setActive("movie")}
                        className={`cursor-pointer ${
                            active === "movie"
                                ? "activeSearch"
                                : "inactiveSearch"
                        }`}
                    >
                        <BiMoviePlay
                            className={
                                active === "movie"
                                    ? "text-2xl sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-lg sm:text-base font-medium transition-all duration-300"
                            }
                        />
                        <span
                            className={
                                active === "movie"
                                    ? "hidden sm:block text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "hidden sm:block text-base sm:text-base font-medium transition-all duration-300"
                            }
                        >
                            Movies
                        </span>
                    </div>
                    <div
                        onClick={() => setActive("tv")}
                        className={`cursor-pointer ${
                            active === "tv" ? "activeSearch" : "inactiveSearch"
                        }`}
                    >
                        <BsCollectionPlayFill
                            className={
                                active === "tv"
                                    ? "text-2xl sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-lg sm:text-base font-medium transition-all duration-300"
                            }
                        />
                        <span
                            className={
                                active === "tv"
                                    ? "hidden sm:block text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "hidden sm:block text-base sm:text-base font-medium transition-all duration-300"
                            }
                        >
                            Series
                        </span>
                    </div>
                    <div
                        onClick={() => setActive("person")}
                        className={`cursor-pointer ${
                            active === "person"
                                ? "activeSearch"
                                : "inactiveSearch"
                        }`}
                    >
                        <BsFillPersonFill
                            className={
                                active === "person"
                                    ? "text-2xl sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-lg sm:text-base font-medium transition-all duration-300"
                            }
                        />
                        <span
                            className={
                                active === "person"
                                    ? "hidden sm:block text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "hidden sm:block text-base sm:text-base font-medium transition-all duration-300"
                            }
                        >
                            People
                        </span>
                    </div>
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
                        active === "movie" ? (
                            data?.results?.filter(
                                (item) => item.media_type === "movie"
                            ).length ? (
                                data?.results?.map(
                                    (item, index) =>
                                        item.media_type === "movie" && (
                                            <MovieCard
                                                key={index}
                                                mediaType="movie"
                                                id={item.id}
                                                img={item.poster_path}
                                                name={item.title}
                                                rating={item.vote_average}
                                                count={item.vote_count}
                                                overview={item.overview}
                                            />
                                        )
                                )
                            ) : (
                                <div
                                    className="w-full flex justify-center items-center text-lg font-bold"
                                    style={{ height: "80vh" }}
                                >
                                    {`There is no movies with ${name}`}
                                </div>
                            )
                        ) : active === "tv" ? (
                            data?.results?.filter(
                                (item) => item.media_type === "tv"
                            ).length ? (
                                data?.results?.map(
                                    (item, index) =>
                                        item.media_type === "tv" && (
                                            <MovieCard
                                                key={index}
                                                mediaType="tv"
                                                id={item.id}
                                                img={item.poster_path}
                                                name={item.name}
                                                rating={item.vote_average}
                                                count={item.vote_count}
                                                overview={item.overview}
                                            />
                                        )
                                )
                            ) : (
                                <div
                                    className="w-full flex justify-center items-center text-lg font-bold"
                                    style={{ height: "80vh" }}
                                >
                                    {`There is no tv series with ${name}`}
                                </div>
                            )
                        ) : active === "person" &&
                          data?.results?.filter(
                              (item) => item.media_type === "person"
                          ).length ? (
                            data?.results?.map(
                                (item) =>
                                    item.media_type === "person" &&
                                    item.profile_path && (
                                        <PeopleCard
                                            key={item.id}
                                            id={item.id}
                                            img={item.profile_path}
                                            name={item.name}
                                        />
                                    )
                            )
                        ) : (
                            <div
                                className="w-full flex justify-center items-center text-lg font-bold"
                                style={{ height: "80vh" }}
                            >
                                {`Sorry, we can't find ${name}`}
                            </div>
                        )
                    ) : (
                        <div
                            className="w-full flex justify-center items-center text-lg font-bold"
                            style={{ height: "80vh" }}
                        >
                            Search anything you like!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
