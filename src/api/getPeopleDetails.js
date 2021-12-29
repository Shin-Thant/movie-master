import axios from "axios";

export const getPeopleDetails = async ({ queryKey }) => {
    const [_key, { id }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/${id}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    return data;
};
