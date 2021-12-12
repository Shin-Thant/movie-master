import axios from "axios";

export const getMovieForHome = async () => {
    const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/634649?api_key=6e5732eb802fd488937cc99050f86e2c"
    );
    return data;
};
