import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { WatchListCard } from "../../components/WatchListCard";
import { WatchListSkeleton } from "../../components/WatchListSkeleton";
import empty from "../../img/empty-text.svg";
import "./watchList.css";
import { BsCollectionPlayFill } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { addNavLink } from "../../redux/Actions/NavbarAction";

export const WatchList = () => {
    const { loading, list } = useSelector((state) => state.watchList);

    const { movies } = useSelector((state) => state.movieList);

    const { tv } = useSelector((state) => state.tvList);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(addNavLink("watchlist"));
    }, []);

    const [filterType, setFilterType] = useState({
        status: false,
        mediaType: "",
    });

    const closeFilter = () => {
        setFilterType({ status: false, mediaType: "" });
    };

    const filterForMovie = () => {
        setFilterType({ status: true, mediaType: "movie" });
    };

    const filterForTv = () => {
        setFilterType({ status: true, mediaType: "tv" });
    };

    const navigate = useNavigate();

    const explore = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen w-full bg-black font-roboto text-white pt-24 pb-32">
            <div className="w-11/12 mx-auto flex items-center justify-evely mb-12 pb-7 watchList-filter">
                <div
                    className={
                        !filterType.status
                            ? "activeWatchList"
                            : "inactiveWatchList"
                    }
                    onClick={closeFilter}
                >
                    <span
                        className={
                            !filterType.status
                                ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                : "text-base sm:text-base font-medium transition-all duration-300"
                        }
                    >
                        All
                    </span>
                </div>
                <div
                    className={
                        filterType.status && filterType.mediaType === "movie"
                            ? "activeWatchList"
                            : "inactiveWatchList"
                    }
                    onClick={filterForMovie}
                >
                    <BiMoviePlay
                        className={
                            filterType.status &&
                            filterType.mediaType === "movie"
                                ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                : "text-base sm:text-base font-medium transition-all duration-300"
                        }
                    />
                    <span
                        className={
                            filterType.status &&
                            filterType.mediaType === "movie"
                                ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                : "text-base sm:text-base font-medium transition-all duration-300"
                        }
                    >
                        Movie
                    </span>
                </div>
                <div
                    className={
                        filterType.status && filterType.mediaType === "tv"
                            ? "activeWatchList"
                            : "inactiveWatchList"
                    }
                    onClick={filterForTv}
                >
                    <BsCollectionPlayFill
                        className={
                            filterType.status && filterType.mediaType === "tv"
                                ? "text-lg sm:text-xl md:text-xl font-bold transition-all duration-300"
                                : "text-base sm:text-base font-medium transition-all duration-300"
                        }
                    />
                    <span
                        className={
                            filterType.status && filterType.mediaType === "tv"
                                ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                : "text-base sm:text-base font-medium transition-all duration-300"
                        }
                    >
                        Tv
                    </span>
                </div>
            </div>

            {loading ? (
                [1, 2, 3, 4].map((item) => <WatchListSkeleton key={item} />)
            ) : list.length ? (
                filterType.status ? (
                    filterType.mediaType === "movie" ? (
                        movies?.length ? (
                            movies.map((item) => (
                                <WatchListCard
                                    key={item.id}
                                    mediaType={item.name ? "tv" : "movie"}
                                    id={item.id}
                                    img={item.poster_path}
                                    name={item.original_title}
                                    rating={item.vote_average}
                                    count={item.vote_count}
                                    overview={item.overview}
                                    trailer={item.videos?.results?.filter(
                                        (item) => item.type === "Trailer"
                                    )}
                                />
                            ))
                        ) : (
                            <div
                                className="w-full flex flex-col justify-center items-center text-lg"
                                style={{ height: "80vh" }}
                            >
                                <h2>You don't have movie in your watchlist!</h2>
                            </div>
                        )
                    ) : tv?.length ? (
                        tv.map((item) => (
                            <WatchListCard
                                key={item.id}
                                mediaType={item.name ? "tv" : "movie"}
                                id={item.id}
                                img={item.poster_path}
                                name={item.original_name}
                                rating={item.vote_average}
                                count={item.vote_count}
                                overview={item.overview}
                                trailer={item.videos?.results?.filter(
                                    (item) => item.type === "Trailer"
                                )}
                            />
                        ))
                    ) : (
                        <div
                            className="w-full flex flex-col justify-center items-center text-lg"
                            style={{ height: "80vh" }}
                        >
                            <h2>You don't have tv series in your watchlist!</h2>
                        </div>
                    )
                ) : (
                    list?.map((item) => (
                        <WatchListCard
                            key={item.id}
                            mediaType={item.name ? "tv" : "movie"}
                            id={item.id}
                            img={item.poster_path}
                            name={
                                item.original_title
                                    ? item.original_title
                                    : item.original_name
                            }
                            rating={item.vote_average}
                            count={item.vote_count}
                            overview={item.overview}
                            trailer={item.videos?.results?.filter(
                                (item) => item.type === "Trailer"
                            )}
                        />
                    ))
                )
            ) : (
                <div
                    className="w-full flex flex-col items-center text-lg justify-center"
                    style={{ height: "80vh" }}
                >
                    <h2>You don't have any watchlists!</h2>
                    <h2
                        className="text-primary font-bold text-lg underline w-max cursor-pointer"
                        onClick={explore}
                    >
                        Explore
                    </h2>
                </div>
            )}
        </div>
    );
};
