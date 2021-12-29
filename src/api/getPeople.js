import axios from "axios";

export const getPeople = async () => {
    const { data } = await axios.get(
        `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&sort_by=popularity.desc`
    );

    return data;
};
