import { queryOptions } from "@tanstack/react-query";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../api/moviesApi";

export const homePageQuery = queryOptions({
    queryKey: ["homePage"],
    queryFn: async () => {
        const recentMoviesTask = retrieveMovies(getNowPlayingMoviesPath());
        const lovedMoviesTask = retrieveMovies(getMostLovedMoviesPath());
        const hatedMoviesTask = retrieveMovies(getMostHatedMoviesPath());
        const classicMoviesTask = retrieveMovies(getClassicMoviesPath());
        const upcomingMoviesTask = retrieveMovies(getUpcomingMoviesPath());
        const [recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies] =
            await Promise.all([
                recentMoviesTask,
                lovedMoviesTask,
                hatedMoviesTask,
                classicMoviesTask,
                upcomingMoviesTask
            ]);
        return { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies };
    }
});
