import React, { useEffect, useState } from "react";
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
import { getTrends } from "../../api/getTrends";
import { TrendsCard } from "../../components/TrendsCard";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { TrendsSkeleton } from "../../components/TrendsSkeleton";
import { addNavLink } from "../../redux/Actions/NavbarAction";
import { getPeople } from "../../api/getPeople";
import { FamousPeople } from "../../components/FamousPeople";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
    const { activeLink } = useSelector((state) => state.navbar);

    const { movieGenreIds, movies, movieStatus, movieLoading } = useSelector(
        (state) => state.primaryMovieFilter
    );

    const { seriesGenreIds, series, seriesStatus, seriesLoading } = useSelector(
        (state) => state.primarySeriesFilter
    );

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(addNavLink("explore"));
    }, []);

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

    const people = useQuery("people", getPeople, { staleTime: 600000 });

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

    const peopleLeft = () => {
        document.querySelector("#home-people-container").scrollLeft -= 300;
    };
    const peopleRight = () => {
        document.querySelector("#home-people-container").scrollLeft += 300;
    };

    const seeMorePeople = () => {
        navigate("/people");
    };

    return (
        <div className="w-full mx-auto bg-black font-roboto pb-32">
            <HomePageIntro />

            <div className="w-full mt-20">
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
                        className="w-full flex items-start overflow-auto gap-x-4 px-12 sm:px-22 lg:px-24 py-4"
                        id="cards-container"
                    >
                        {trends.isLoading
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (item) => <TrendsSkeleton key={item} />
                              )
                            : trends.data?.results?.map((item, index) => (
                                  <TrendsCard
                                      key={index}
                                      mediaType={item.name ? "tv" : "movie"}
                                      id={item.id}
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

                <div className="mt-20 w-4/5 mx-auto text-white flex items-end justify-between people-intro mb-5 pb-6">
                    <h2 className="text-3xl font-bold people-section-head">
                        People
                    </h2>
                    <h3
                        onClick={seeMorePeople}
                        className="text-primary font-bold hover:underline cursor-pointer"
                    >
                        see more
                    </h3>
                </div>

                <div className="w-full relative text-white">
                    <div className="left-btn text-4xl lg:text-5xl flex justify-center items-center text-gray-400 hover:text-gray-200">
                        <button
                            onClick={peopleLeft}
                            className="cursor-pointer w-max"
                        >
                            <BsChevronCompactLeft />
                        </button>
                    </div>
                    <div
                        className="w-full flex items-start overflow-auto gap-x-4 px-12 sm:px-22 lg:px-24 py-4"
                        id="home-people-container"
                    >
                        {people.isLoading
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (item) => (
                                      <div
                                          key={item}
                                          className="animate-pulse bg-gray-300 rounded-xl castSkeleton"
                                      ></div>
                                  )
                              )
                            : people.data?.results?.map(
                                  (item, index) =>
                                      index < 6 && (
                                          <FamousPeople
                                              key={index}
                                              id={item.id}
                                              img={item.profile_path}
                                              name={item.name}
                                          />
                                      )
                              )}
                    </div>

                    <div className="right-btn text-4xl lg:text-5xl flex justify-center items-center text-gray-400 hover:text-gray-200">
                        <button
                            onClick={peopleRight}
                            className="cursor-pointer w-max"
                        >
                            <BsChevronCompactRight />
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-11/12 md:w-10/12 s_tablet:w-4/5 mx-auto mt-28 pb-5">
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
                                        mediaType={item.name ? "tv" : "movie"}
                                        id={item.id}
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
                        ) : isLoading ? (
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                (item) => <Skeleton key={item} />
                            )
                        ) : (
                            data?.results?.map((item, index) => (
                                <MovieCard
                                    key={index}
                                    mediaType={item.name ? "tv" : "movie"}
                                    id={item.id}
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
                                    mediaType={item.name ? "tv" : "movie"}
                                    id={item.id}
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
                    ) : isLoading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                            <Skeleton key={item} />
                        ))
                    ) : (
                        data?.results?.map((item, index) => (
                            <MovieCard
                                key={index}
                                mediaType={item.name ? "tv" : "movie"}
                                id={item.id}
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

// data?.results?.length > 0 &&
