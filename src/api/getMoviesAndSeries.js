import axios from "axios";

export const getMoviesAndSeries = async ({ queryKey }) => {
    const [_key, { active }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/${active}?api_key=6e5732eb802fd488937cc99050f86e2c`
    );

    return data;
};
