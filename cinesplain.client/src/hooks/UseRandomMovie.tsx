import { useEffect, useState } from "react";
import Movie from "../types/movie.ts";

/*
 * Picks the movie to feature in a spotlight section. The initial pick is
 * derived from the spotlight seed that shipped with the list data, keeping the
 * server render and the first client render in agreement; the interval then
 * rotates through the list.
 */
const useRandomMovie = (
    movies: Movie[],
    spotlightSeed: number,
    interval: number,
    requireBackdrop: boolean = false
) => {
    const filteredMovies = requireBackdrop ? movies.filter((movie) => movie.backdropPath) : movies;
    const [randomMovieIndex, setRandomMovieIndex] = useState(() =>
        filteredMovies.length
            ? Math.min(
                  filteredMovies.length - 1,
                  Math.floor(spotlightSeed * filteredMovies.length)
              )
            : 0
    );

    useEffect(() => {
        if (filteredMovies.length) {
            const timer = setInterval(() => {
                setRandomMovieIndex((prevIndex) => {
                    const newIndex = Math.floor(Math.random() * filteredMovies.length);
                    return newIndex !== prevIndex
                        ? newIndex
                        : (newIndex + 1) % filteredMovies.length;
                });
            }, interval);

            return () => {
                clearInterval(timer);
            };
        }
    }, [movies, interval, filteredMovies.length]);

    return filteredMovies[randomMovieIndex];
};

export default useRandomMovie;
