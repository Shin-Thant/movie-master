import axios from "axios";

export const getDetails = async ({ queryKey }) => {
    const [_key, { id, mediaType }] = queryKey;

    const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=6e5732eb802fd488937cc99050f86e2c&append_to_response=videos,reviews,similar,credits`
    );

    return data;
};
