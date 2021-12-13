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

export const HomePage = () => {
    const { movieGenreIds, movies, movieStatus, movieLoading } = useSelector(
        (state) => state.primaryMovieFilter
    );

    const { seriesGenreIds, series, seriesStatus, seriesLoading } = useSelector(
        (state) => state.primarySeriesFilter
    );

    const dispatch = useDispatch();

    const [active, setActive] = useState("movie");

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

    return (
        <div className="w-full mx-auto bg-black font-roboto">
            <HomePageIntro />

            <div className="w-full sm:w-11/12 md:w-10/12 s_tablet:w-4/5 mx-auto mt-10 pb-5">
                <div className="flex items-center mb-8 pb-6 types">
                    <div
                        onClick={typeMovie}
                        className={
                            active === "movie" ? " activeType" : "inactiveType"
                        }
                    >
                        <BiMoviePlay
                            className={
                                active === "movie"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold"
                                    : "text-base sm:text-base font-medium"
                            }
                        />
                        <span
                            className={
                                active === "movie"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold"
                                    : "text-base sm:text-base font-medium"
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
                                    ? "text-lg sm:text-xl md:text-2xl font-bold"
                                    : "text-base sm:text-base font-medium"
                            }
                        />
                        <span
                            className={
                                active === "tv"
                                    ? "text-lg sm:text-xl md:text-2xl font-bold"
                                    : "text-base sm:text-base font-medium"
                            }
                        >
                            Series
                        </span>
                    </div>
                </div>

                <GenreFilter />

                <div className="flex flex-wrap justify-center gap-x-3 gap-y-6 ">
                    {movieStatus
                        ? movieGenreIds?.length
                            ? movieLoading
                                ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                      (item) => <Skeleton key={item} />
                                  )
                                : movies?.map((item, index) => (
                                      <MovieCard
                                          key={index}
                                          img={item.poster_path}
                                          name={item.title}
                                          rating={item.vote_average}
                                          count={item.vote_count}
                                          overview={item.overview}
                                      />
                                  ))
                            : data?.results?.length > 0 &&
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
                        : seriesGenreIds?.length
                        ? seriesLoading
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (item) => <Skeleton key={item} />
                              )
                            : series?.map((item, index) => (
                                  <MovieCard
                                      key={index}
                                      img={item.poster_path}
                                      name={item.name}
                                      rating={item.vote_average}
                                      count={item.vote_count}
                                      overview={item.overview}
                                  />
                              ))
                        : data?.results?.length > 0 &&
                          data.results.map((item, index) => (
                              <MovieCard
                                  key={index}
                                  img={item.poster_path}
                                  name={item.name}
                                  rating={item.vote_average}
                                  count={item.vote_count}
                                  overview={item.overview}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
};
