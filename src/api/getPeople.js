import axios from "axios";

export const getPeople = async () => {
    const { data } = await axios.get(
        "https://api.themoviedb.org/3/person/popular?api_key=6e5732eb802fd488937cc99050f86e2c&sort_by=popularity.desc"
    );

    return data;
};
