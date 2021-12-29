import React from "react";
import { useQuery } from "react-query";
import { getPeople } from "../../api/getPeople";
import { PeopleCard } from "../../components/PeopleCard";
import "./peoplepage.css";

export const PeoplePage = () => {
    const { isLoading, error, data } = useQuery("people", getPeople, {
        staleTime: 600000,
    });

    return (
        <div className="w-full bg-black pt-28 pb-32 font-roboto">
            <div className="w-11/12 mx-auto flex flex-wrap justify-center gap-7 sm:gap-6 md:gap-8">
                {isLoading
                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                          <div
                              key={item}
                              className="animate-pulse w-52 h-72 rounded-xl bg-gray-300"
                          ></div>
                      ))
                    : data?.results?.map((item) => (
                          <PeopleCard
                              key={item.id}
                              id={item.id}
                              img={item.profile_path}
                              name={item.name}
                          />
                      ))}
            </div>
        </div>
    );
};
