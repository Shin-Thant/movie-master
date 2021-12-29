import axios from "axios";

export const getPeopleDetails = async ({ queryKey }) => {
    const [_key, { id }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=6e5732eb802fd488937cc99050f86e2c`
    );
    return data;
};
