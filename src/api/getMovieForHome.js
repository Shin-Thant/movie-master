import axios from "axios";

export const getMovieForHome = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/634649?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
    );
    return data;
};
