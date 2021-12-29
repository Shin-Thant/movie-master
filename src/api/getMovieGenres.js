import axios from "axios";

export const getMovieGenres = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );

    return data;
};
