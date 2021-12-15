import React, { useState } from "react";
import { HomePageIntro } from "../../components/HomePageIntro";
import { BiMoviePlay } from "react-icons/bi";
import { BsCollectionPlayFill } from "react-icons/bs";
import { useQuery } from "react-query";
import { getMoviesAndSeries } from "../../api/getMoviesAndSeries";
import { MovieCard } from "../../components/MovieCard";
import { Skeleton } from "../../components/Skeleton";
import "./homepage.css";
import { GenreFilter } from "../../components/GenreFilter";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../redux/Actions/FilterActions";
import { FiTrendingUp } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { getTrends } from "../../api/getTrends";
import { TrendsCard } from "../../components/TrendsCard";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { TrendsSkeleton } from "../../components/TrendsSkeleton";

export const HomePage = () => {
    const { movieGenreIds, movies, movieStatus, movieLoading } = useSelector(
        (state) => state.primaryMovieFilter
    );

    const { seriesGenreIds, series, seriesStatus, seriesLoading } = useSelector(
        (state) => state.primarySeriesFilter
    );

    const dispatch = useDispatch();

    const [active, setActive] = useState("movie");

    const [media_type, setMediaType] = useState("all");

    const [time, setTime] = useState("day");

    const { isLoading, error, data } = useQuery(
        ["type", { active }],
        getMoviesAndSeries,
        {
            staleTime: 600000,
        }
    );

    const typeMovie = () => {
        setActive("movie");
        dispatch(changeStatus("movie"));
    };
    const typeSeries = () => {
        setActive("tv");
        dispatch(changeStatus("series"));
    };

    const trends = useQuery(["get", { media_type, time }], getTrends, {
        staleTime: 600000,
    });
    console.log(trends);

    const changeMediaType = (e) => {
        setMediaType(e.target.value);
    };

    const changeTime = (e) => {
        setTime(e.target.value);
    };

    const left = () => {
        document.getElementById("cards-container").scrollLeft -= 300;
    };
    const right = () => {
        document.getElementById("cards-container").scrollLeft += 300;
    };

    return (
        <div className="w-full mx-auto bg-black font-roboto">
            <HomePageIntro />

            <div className="w-full mt-10">
                <div className="s_base:w-11/12 md:w-10/12 s_tablet:w-4/5 mx-auto flex items-center justify-center mb-5 pb-6 types">
                    <div className="activeRole flex items-center justify-center w-1/2 gap-2 text-white">
                        <FiTrendingUp className="text-lg sm:text-xl md:text-2xl font-bold " />
                        <span className="text-lg sm:text-xl md:text-2xl font-bold ">
                            Trends Now
                        </span>
                    </div>
                </div>
                <div className="s_base:w-11/12 md:w-10/12 s_tablet:w-4/5 mx-auto flex items-center gap-5 mb-8">
                    <div>
                        <select
                            value={media_type}
                            onChange={changeMediaType}
                            className="type-select"
                        >
                            <option value="all">All</option>
                            <option value="movie">Movie</option>
                            <option value="tv">Tv</option>
                        </select>
                    </div>
                    <div>
                        <select
                            value={time}
                            onChange={changeTime}
                            className="type-select"
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                        </select>
                    </div>
                </div>

                <div className="w-full relative">
                    <div className="left-btn text-4xl lg:text-5xl flex justify-center items-center text-gray-400 hover:text-gray-200">
                        <button onClick={left} className="cursor-pointer w-max">
                            <BsChevronCompactLeft />
                        </button>
                    </div>
                    <div
                        className="w-full flex items-start overflow-auto gap-x-4 px-8 sm:px-19 md:px-20 lg:px-24 py-4"
                        id="cards-container"
                    >
                        {trends.isLoading
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (item) => <TrendsSkeleton key={item} />
                              )
                            : trends.data?.results?.map((item, index) => (
                                  <TrendsCard
                                      key={index}
                                      img={item.poster_path}
                                      name={item.name ? item.name : item.title}
                                      rating={item.vote_average}
                                      count={item.vote_count}
                                      overview={item.overview}
                                  />
                              ))}
                    </div>
                    <div className="right-btn text-4xl lg:text-5xl flex justify-center items-center text-gray-400 hover:text-gray-200">
                        <button
                            onClick={right}
                            className="cursor-pointer w-max"
                        >
                            <BsChevronCompactRight />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-11/12 md:w-10/12 s_tablet:w-4/5 mx-auto mt-10 pb-5">
                <div className="flex justify-around items-center s_base:mb-5 sm:mb-7 md:mb-8 pb-6 types w-11/12 sm:w-full mx-auto">
                    <div
                        onClick={typeMovie}
                        className={
                            active === "movie" ? " activeType" : "inactiveType"
                        }
                    >
                        <BiMoviePlay
                            className={
                                active === "movie"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-base sm:text-base font-medium transition-all duration-300"
                            }
                        />
                        <span
                            className={
                                active === "movie"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-base sm:text-base font-medium transition-all duration-300"
                            }
                        >
                            Movies
                        </span>
                    </div>
                    <div
                        onClick={typeSeries}
                        className={
                            active === "tv" ? "activeType" : "inactiveType"
                        }
                    >
                        <BsCollectionPlayFill
                            className={
                                active === "tv"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-base sm:text-base font-medium transition-all duration-300"
                            }
                        />
                        <span
                            className={
                                active === "tv"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300"
                                    : "text-base sm:text-base font-medium transition-all duration-300"
                            }
                        >
                            Series
                        </span>
                    </div>
                </div>

                <GenreFilter />

                <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 ">
                    {movieStatus ? (
                        movieGenreIds?.length ? (
                            movieLoading ? (
                                [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                    (item) => <Skeleton key={item} />
                                )
                            ) : movies.length ? (
                                movies.map((item, index) => (
                                    <MovieCard
                                        key={index}
                                        img={item.poster_path}
                                        name={item.title}
                                        rating={item.vote_average}
                                        count={item.vote_count}
                                        overview={item.overview}
                                    />
                                ))
                            ) : (
                                <div className="text-xl font-semibold out-of-list flex justify-center items-center text-white">
                                    Movies Out of List!
                                </div>
                            )
                        ) : (
                            data?.results?.length > 0 &&
                            data.results.map((item, index) => (
                                <MovieCard
                                    key={index}
                                    img={item.poster_path}
                                    name={item.title}
                                    rating={item.vote_average}
                                    count={item.vote_count}
                                    overview={item.overview}
                                />
                            ))
                        )
                    ) : seriesGenreIds?.length ? (
                        seriesLoading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                (item) => <Skeleton key={item} />
                            )
                        ) : series.length ? (
                            series.map((item, index) => (
                                <MovieCard
                                    key={index}
                                    img={item.poster_path}
                                    name={item.name}
                                    rating={item.vote_average}
                                    count={item.vote_count}
                                    overview={item.overview}
                                />
                            ))
                        ) : (
                            <div className="text-xl font-semibold out-of-list flex justify-center items-center text-white">
                                Tv Series Out of List!
                            </div>
                        )
                    ) : (
                        data?.results?.length > 0 &&
                        data.results.map((item, index) => (
                            <MovieCard
                                key={index}
                                img={item.poster_path}
                                name={item.name}
                                rating={item.vote_average}
                                count={item.vote_count}
                                overview={item.overview}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
