import axios from "axios";

export const getMoviesAndSeries = async ({ queryKey }) => {
    const [_key, { active }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/${active}?api_key=${process.env.REACT_APP_API_KEY}`
    );

    return data;
};
