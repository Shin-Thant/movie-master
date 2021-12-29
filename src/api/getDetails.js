import axios from "axios";

export const getDetails = async ({ queryKey }) => {
    const [_key, { id, mediaType }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,reviews,similar,credits`
    );

    return data;
};
