import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getMovieGenres } from "../api/getMovieGenres";
import { getTvGenres } from "../api/getTvGenres";
import {
    addMovieType,
    addSeriesType,
    removeMovieType,
    removeSeriesType,
} from "../redux/Actions/FilterActions";
import "./genrefilter.css";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const GenreBtn = ({ id, name }) => {
    const { movieStatus, movieGenreIds } = useSelector(
        (state) => state.primaryMovieFilter
    );
    const { seriesStatus, seriesGenreIds } = useSelector(
        (state) => state.primarySeriesFilter
    );

    const dispatch = useDispatch();

    const [active, setActive] = useState(false);

    useEffect(() => {
        if (movieStatus) {
            if (movieGenreIds?.length < 1) {
                setActive(false);
            }
        }
    }, [movieGenreIds]);

    useEffect(() => {
        if (seriesStatus) {
            if (seriesGenreIds?.length < 1) {
                setActive(false);
            }
        }
    }, [seriesGenreIds]);

    const addFilter = () => {
        if (!active) {
            setActive(true);

            if (movieStatus) {
                dispatch(addMovieType(id));
            } else {
                console.log();
                dispatch(addSeriesType(id));
            }
        } else {
            setActive(false);

            if (movieStatus) {
                dispatch(removeMovieType(id));
            } else {
                dispatch(removeSeriesType(id));
            }
        }
    };
    return (
        <button
            onClick={addFilter}
            className={
                active
                    ? "w-max px-6 py-1.5 rounded-full font-semibold bg-primary"
                    : "w-max px-6 py-1.5 rounded-full font-semibold bg-secondary hover:border-primary hover:border-2"
            }
        >
            {name}
        </button>
    );
};

export const GenreFilter = () => {
    const { movieStatus } = useSelector((state) => state.primaryMovieFilter);

    const { data } = useQuery("movieGenres", getMovieGenres, {
        staleTime: 600000,
    });

    const tvGenres = useQuery("tvGenres", getTvGenres, {
        staleTime: 600000,
    });

    const toLeft = () => {
        document.querySelector(".filter-container").scrollLeft -= 300;
    };

    const toRight = () => {
        document.querySelector(".filter-container").scrollLeft += 300;
    };

    return (
        <div className="text-white mb-16 relative">
            <div className="w-full filter-container px-2 flex items-center gap-4 overflow-auto">
                {movieStatus
                    ? data &&
                      data.genres.map((item) => (
                          <GenreBtn
                              key={item.id}
                              id={item.id}
                              name={item.name}
                          />
                      ))
                    : tvGenres?.data?.data?.genres.map((item) => (
                          <GenreBtn
                              key={item.id}
                              id={item.id}
                              name={item.name}
                          />
                      ))}
            </div>
            <div className="w-full flex items-center justify-center gap-5 mt-4">
                <button
                    onClick={toLeft}
                    className="border-2 border-white px-2 py-2 sm:px-2.5 sm:py-2.5 text-xl rounded-full click-left"
                >
                    <BsArrowLeft />
                    <span className="slide"></span>
                </button>
                <button
                    onClick={toRight}
                    className="border-2 border-white px-2 py-2 sm:px-2.5 sm:py-2.5 text-xl rounded-full click-right"
                >
                    <BsArrowRight />
                    <span className="slide"></span>
                </button>
            </div>
        </div>
    );
};
