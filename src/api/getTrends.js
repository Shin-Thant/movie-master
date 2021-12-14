import axios from "axios";

export const getTrends = async ({ queryKey }) => {
    const [_key, { media_type, time }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/${media_type}/${time}?api_key=6e5732eb802fd488937cc99050f86e2c`
    );

    return data;
};
