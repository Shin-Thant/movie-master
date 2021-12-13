import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getMovieGenres } from "../api/getMovieGenres";
import { getTvGenres } from "../api/getTvGenres";
import {
    // addMovies,
    // addSeries,
    addMovieType,
    addSeriesType,
    // removeMovies,
    // removeSeries,
    removeMovieType,
    removeSeriesType,
} from "../redux/Actions/FilterActions";
import "./genrefilter.css";

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

    return (
        <div className="filter-container flex items-center gap-5 overflow-auto text-white px-5 pb-2 mb-10">
            {movieStatus
                ? data &&
                  data.genres.map((item) => (
                      <GenreBtn key={item.id} id={item.id} name={item.name} />
                  ))
                : tvGenres?.data?.data?.genres.map((item) => (
                      <GenreBtn key={item.id} id={item.id} name={item.name} />
                  ))}
        </div>
    );
};
