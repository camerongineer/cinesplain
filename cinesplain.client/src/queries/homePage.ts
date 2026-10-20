import { queryOptions } from "@tanstack/react-query";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../api/moviesApi";
import SpotlightList from "../types/SpotlightList";

/*
 * One query per list so each home page section streams to the browser as soon
 * as its own fetch resolves instead of waiting for the slowest of the five.
 * The spotlight seed is generated once per fetch, so it is shared with the
 * client through the dehydrated query cache (the featured movie differs per
 * page load yet never swaps at hydration).
 */
const retrieveSpotlightList = async (path: string): Promise<SpotlightList> => {
    const movies = await retrieveMovies(path);
    return { movies, spotlightSeed: Math.random() };
};

export const recentMoviesQuery = queryOptions({
    queryKey: ["recentMovies"],
    queryFn: () => retrieveSpotlightList(getNowPlayingMoviesPath())
});

export const lovedMoviesQuery = queryOptions({
    queryKey: ["lovedMovies"],
    queryFn: () => retrieveSpotlightList(getMostLovedMoviesPath())
});

export const hatedMoviesQuery = queryOptions({
    queryKey: ["hatedMovies"],
    queryFn: () => retrieveSpotlightList(getMostHatedMoviesPath())
});

export const classicMoviesQuery = queryOptions({
    queryKey: ["classicMovies"],
    queryFn: () => retrieveSpotlightList(getClassicMoviesPath())
});

export const upcomingMoviesQuery = queryOptions({
    queryKey: ["upcomingMovies"],
    queryFn: () => retrieveSpotlightList(getUpcomingMoviesPath())
});
