import { queryOptions } from "@tanstack/react-query";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../api/moviesApi";

// One query per list so each home page section streams to the browser as soon
// as its own fetch resolves instead of waiting for the slowest of the five.
export const recentMoviesQuery = queryOptions({
    queryKey: ["recentMovies"],
    queryFn: () => retrieveMovies(getNowPlayingMoviesPath())
});

export const lovedMoviesQuery = queryOptions({
    queryKey: ["lovedMovies"],
    queryFn: () => retrieveMovies(getMostLovedMoviesPath())
});

export const hatedMoviesQuery = queryOptions({
    queryKey: ["hatedMovies"],
    queryFn: () => retrieveMovies(getMostHatedMoviesPath())
});

export const classicMoviesQuery = queryOptions({
    queryKey: ["classicMovies"],
    queryFn: () => retrieveMovies(getClassicMoviesPath())
});

export const upcomingMoviesQuery = queryOptions({
    queryKey: ["upcomingMovies"],
    queryFn: () => retrieveMovies(getUpcomingMoviesPath())
});
