import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getDetails } from "../../api/getDetails";
import "./detailspage.css";
import { AiFillStar } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToWatchList } from "../../redux/Actions/WathListAction";
import { BsChevronCompactRight, BsChevronCompactLeft } from "react-icons/bs";
import { MovieCard } from "../../components/MovieCard";
import { Review } from "../../components/Review";
import { TrendsSkeleton } from "../../components/TrendsSkeleton";
import { TrendsCard } from "../../components/TrendsCard";
import { addNavLink } from "../../redux/Actions/NavbarAction";

export const Divider = () => {
    return (
        <div
            className="w-full bg-secondary mx-auto rounded-full mt-8 mb-12"
            style={{ height: "2px" }}
        ></div>
    );
};

export const DetailsPage = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { mediaType, id } = useParams();

    const { isLoading, error, data } = useQuery(
        ["details", { id, mediaType }],
        getDetails,
        { staleTime: 600000 }
    );

    const addToList = () => {
        dispatch(addToWatchList(mediaType, id));
    };

    const [role, setRole] = useState("cast");

    const changeItem = (itemName) => {
        setRole(itemName);
    };

    const left = () => {
        document.getElementById("castcrew-scroll").scrollLeft -= 300;
    };
    const right = () => {
        document.getElementById("castcrew-scroll").scrollLeft += 300;
    };

    const similarLeft = () => {
        document.getElementById("cards-container").scrollLeft -= 300;
    };
    const similarRight = () => {
        document.getElementById("cards-container").scrollLeft += 300;
    };

    console.log(data?.episode_run_time, data?.id);

    return (
        <div className="text-white font-roboto bg-black min-h-screen w-full pt-28 pb-32">
            <div className="flex flex-col justify-bewteen items-start w-full sm:w-11/12 md:flex-row md:items-center mx-auto gap-8 md:gap-0 lg:gap-6 xl:gap-5 px-5 sm:-0">
                <div className="details-img flex justify-center">
                    {isLoading ? (
                        <div className="animate-pulse bg-gray-300 w-9/12 sm:w-1/2 md:w-11/12 s_tablet:w-10/12 lg:w-4/5 xl:w-4/6 h-96 rounded-lg"></div>
                    ) : (
                        <img
                            src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                            alt=""
                        />
                    )}
                </div>

                <div className="sm:w-full md:w-3/5 s_tablet:w-8/12 lg:w-9/12 xl:w-3/5">
                    <div className="flex gap-3 flex-wrap mb-4">
                        {isLoading
                            ? [0, 1, 2, 3].map((item) => (
                                  <div
                                      key={item}
                                      className="w-24 h-6 bg-gray-300 animate-pulse rounded-full"
                                  ></div>
                              ))
                            : data?.genres.map((item) => (
                                  <div
                                      key={item.id}
                                      className="cursor-default bg-primary font-semibold text-base rounded-full px-4 py-1"
                                  >
                                      {item.name}
                                  </div>
                              ))}
                    </div>

                    {data?.runtime && (
                        <h2 className="font-semibold text-lg mb-4">
                            Duration -{" "}
                            <span className="text-primary">
                                {data?.runtime > 60
                                    ? `${Math.floor(data.runtime / 60)}hr ${
                                          data?.runtime % 60
                                      }m`
                                    : `${data.runtime}m`}
                            </span>
                        </h2>
                    )}

                    {data?.number_of_seasons && data?.number_of_episodes && (
                        <div className="flex items-center gap-3 mb-4">
                            {data?.episode_run_time.length ? (
                                <h2 className="font-semibold text-lg">
                                    Duration -{" "}
                                    <span className="text-primary">
                                        {data?.episode_run_time > 60
                                            ? `${Math.floor(
                                                  data.episode_run_time / 60
                                              )}hr ${
                                                  data?.episode_run_time % 60
                                              }m`
                                            : `${data.episode_run_time}m`}
                                    </span>
                                </h2>
                            ) : (
                                ""
                            )}
                            <h2 className="font-semibold text-lg">
                                Seasons{" "}
                                <span className="text-primary font-bold">
                                    {data?.number_of_seasons}
                                </span>
                            </h2>{" "}
                            -
                            <h2 className="font-semibold text-lg">
                                Episodes{" "}
                                <span className="text-primary font-bold">
                                    {data?.number_of_episodes}
                                </span>
                            </h2>
                        </div>
                    )}

                    {isLoading ? (
                        <div className="animate-pulse rounded-full w-4/12 h-3 bg-gray-300 mb-5"></div>
                    ) : (
                        <h1 className="text-3xl font-bold mb-5">
                            {data?.original_title
                                ? data?.original_title
                                : data?.original_name}
                        </h1>
                    )}

                    {isLoading ? (
                        <div className="mb-5 flex items-center gap-3 animate-pulse">
                            <div className=" rounded-full w-16 h-3 bg-gray-300 mb-5"></div>
                            <div className=" rounded-full w-10 h-3 bg-gray-300 mb-5"></div>
                        </div>
                    ) : (
                        <h3 className="mb-5 flex items-center gap-3">
                            <div className="flex items-center text-yellow-400 font-bold text-lg">
                                <AiFillStar />
                                {data?.vote_average}
                            </div>

                            <div className="text-sm">
                                ({data?.vote_count} ratings)
                            </div>
                        </h3>
                    )}

                    {isLoading ? (
                        <div className="animate-pulse mb-7">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                                <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                            </div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                            </div>
                            <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
                            <div className="w-full h-3 bg-gray-300 rounded-lg mb-2"></div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-full h-3 bg-gray-300 rounded-lg"></div>
                                <div className="w-3/12 h-3 bg-gray-300 rounded-lg"></div>
                            </div>
                        </div>
                    ) : (
                        <p className="text-base mb-7">{data?.overview}</p>
                    )}

                    {isLoading ? (
                        <div className="animate-pulse w-full flex items-center gap-6">
                            <div className="w-4/12 h-8 bg-gray-400 rounded-full"></div>
                            <div className="w-4/12 h-8 bg-gray-400 rounded-full"></div>
                        </div>
                    ) : (
                        <div className="w-full flex gap-6 items-center flex-wrap justify-start">
                            <a
                                href={`https://www.youtube.com/watch?v=${
                                    data?.videos?.results?.filter(
                                        (item) => item.type === "Trailer"
                                    )[0]?.key
                                }`}
                                target="_blank"
                                className="bg-primary uppercase px-6 text-sm font-semibold py-2 rounded-full shadow-primary"
                            >
                                Watch Trailer
                            </a>
                            <button
                                onClick={addToList}
                                className="bg-secondary uppercase px-6 text-sm font-semibold py-2 rounded-full"
                            >
                                Add To List
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="w-full mx-auto px-5 mt-20">
                <div className="flex justify-between md:justify-evenly items-center">
                    <div
                        className={
                            role === "cast" ? "activeItem" : "inactiveItem"
                        }
                    >
                        <span
                            onClick={() => changeItem("cast")}
                            className={
                                role === "cast"
                                    ? "text-lg sm:text-xl font-bold transition-all duration-300 cursor-pointer"
                                    : "text-base sm:text-base font-medium transition-all duration-300 cursor-pointer"
                            }
                        >
                            Cast
                        </span>
                    </div>
                    <div
                        className={
                            role === "production"
                                ? "activeItem"
                                : "inactiveItem"
                        }
                    >
                        <span
                            onClick={() => changeItem("production")}
                            className={
                                role === "production"
                                    ? "text-lg sm:text-xl font-bold transition-all duration-300 cursor-pointer"
                                    : "text-base sm:text-base font-medium transition-all duration-300 cursor-pointer"
                            }
                        >
                            Companies
                        </span>
                    </div>
                </div>

                <Divider />

                {role === "cast" && (
                    <div className="w-full mx-auto relative">
                        <div className="hidden md:flex left-btn text-4xl lg:text-5xl justify-center items-center text-gray-400 hover:text-gray-200">
                            <button className="w-max" onClick={left}>
                                <BsChevronCompactLeft />
                            </button>
                        </div>
                        <div
                            className="scroll w-full flex overflow-auto gap-3 px-5 py-3 md:px-20"
                            id="castcrew-scroll"
                        >
                            {isLoading
                                ? [1, 2, 3, 4, 5, 6].map((item) => (
                                      <div
                                          key={item}
                                          className="animate-pulse bg-gray-300 rounded-xl castSkeleton"
                                      ></div>
                                  ))
                                : data?.credits?.cast?.map((item) =>
                                      item.profile_path ? (
                                          <div className="casts" key={item.id}>
                                              <img
                                                  src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                                  alt=""
                                              />
                                              <div className="flex flex-col justify-center items-center gap-5 cast-name text-white font-bold text-2xl">
                                                  <span className="text-center">
                                                      {item.character}
                                                  </span>
                                                  <span className="text-base text-center text-gray-300">
                                                      by {item.original_name}
                                                  </span>
                                              </div>
                                          </div>
                                      ) : (
                                          <div className="casts" key={item.id}>
                                              <h2>{item.character}</h2>
                                          </div>
                                      )
                                  )}
                        </div>
                        <div className="hidden md:flex right-btn text-4xl lg:text-5xl text-gray-400 hover:text-gray-200">
                            <button className="w-max" onClick={right}>
                                <BsChevronCompactRight />
                            </button>
                        </div>
                    </div>
                )}

                {role === "production" && (
                    <div className="w-full mx-auto relative">
                        <div
                            className={`left-btn text-4xl lg:text-5xl text-gray-400 hover:text-gray-200 ${
                                data?.production_companies?.length >= 4
                                    ? "activeArrow"
                                    : "inactiveArrow"
                            }
                             `}
                        >
                            <button className="w-max" onClick={left}>
                                <BsChevronCompactLeft />
                            </button>
                        </div>
                        <div
                            className={`scroll w-full flex gap-3 px-5 md:px-16 py-3 overflow-auto`}
                            id="castcrew-scroll"
                        >
                            {isLoading
                                ? [0, 1, 2].map((item) => (
                                      <div
                                          key={item}
                                          className="animate-pulse bg-gray-300 rounded-xl companySkeleton"
                                      ></div>
                                  ))
                                : data?.production_companies?.map((item) => {
                                      if (item.logo_path) {
                                          return (
                                              <div
                                                  key={item.id}
                                                  className="companies cursor-default bg-gray-100 flex justify-center items-center py-10 rounded-lg"
                                              >
                                                  <img
                                                      src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                                                      alt=""
                                                  />
                                              </div>
                                          );
                                      } else {
                                          return (
                                              <div
                                                  key={item.id}
                                                  className="cursor-default text-center text-secondary bg-gray-100 companies px-5 w-max flex justify-center items-center py-10 rounded-lg text-2xl font-bold"
                                              >
                                                  <span>{item.name}</span>
                                              </div>
                                          );
                                      }
                                  })}
                        </div>
                        <div
                            className={`right-btn text-4xl lg:text-5xl text-gray-400 hover:text-gray-200 ${
                                data?.production_companies?.length >= 4
                                    ? "activeArrow"
                                    : "inactiveArrow"
                            }`}
                        >
                            <button className="w-max" onClick={right}>
                                <BsChevronCompactRight />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Similar */}
            <div className="w-full mx-auto mt-20">
                <h2 className="text-xl font-semibold mb-8 bottom-spot text-center">
                    Similar {mediaType}
                </h2>
                <Divider />
                <div className="w-full relative">
                    <div className="left-btn text-4xl lg:text-5xl hidden md:flex justify-center items-center text-gray-400 hover:text-gray-200">
                        <button
                            onClick={similarLeft}
                            className="cursor-pointer w-max"
                        >
                            <BsChevronCompactLeft />
                        </button>
                    </div>
                    <div
                        className="scroll w-full flex items-start overflow-auto gap-x-4 px-9 sm:px-19 md:px-20 lg:px-24 py-3"
                        id="cards-container"
                    >
                        {isLoading
                            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (item) => <TrendsSkeleton key={item} />
                              )
                            : data?.similar?.results?.map((item, index) => (
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
                    <div className="right-btn text-4xl lg:text-5xl hidden md:flex justify-center items-center text-gray-400 hover:text-gray-200">
                        <button
                            onClick={similarRight}
                            className="cursor-pointer w-max"
                        >
                            <BsChevronCompactRight />
                        </button>
                    </div>
                </div>
            </div>

            {/* Reviews */}
            <div className="w-full md:w-4/5 mx-auto px-5 mt-20">
                <h2 className="text-xl font-semibold mb-8 bottom-spot text-center">
                    Reviews
                </h2>

                <Divider />

                {data?.reviews?.results?.length ? (
                    data?.reviews?.results?.map((item) => (
                        <Review
                            key={item.id}
                            author={item.author}
                            content={item.content}
                        />
                    ))
                ) : (
                    <div className="text-center text-lg">No reviews yet!</div>
                )}
            </div>
        </div>
    );
};
