import axios from "axios";

export const getMovieGenres = async () => {
    const { data } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=6e5732eb802fd488937cc99050f86e2c"
    );

    return data;
};
