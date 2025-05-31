import { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../api/moviesApi";
import Movie from "../types/movie";

interface LoaderData {
    recentMovies: Movie[];
    lovedMovies: Movie[];
    hatedMovies: Movie[];
    classicMovies: Movie[];
    upcomingMovies: Movie[];
}

const homePageQuery: FetchQueryOptions<LoaderData> = {
    queryKey: ["homePage"],
    queryFn: async () => {
        const recentMoviesTask = retrieveMovies(getNowPlayingMoviesPath());
        const lovedMoviesTask = retrieveMovies(getMostLovedMoviesPath());
        const hatedMoviesTask = retrieveMovies(getMostHatedMoviesPath());
        const classicMoviesTask = retrieveMovies(getClassicMoviesPath());
        const upcomingMoviesTask = retrieveMovies(getUpcomingMoviesPath());
        const [recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies] = await Promise.all([
            recentMoviesTask,
            lovedMoviesTask,
            hatedMoviesTask,
            classicMoviesTask,
            upcomingMoviesTask
        ]);
        return { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies };
    }
};

const homePageLoader = (queryClient: QueryClient) => async () => {
    const data: LoaderData | undefined = queryClient.getQueryData(homePageQuery.queryKey);
    return data ?? (await queryClient.fetchQuery(homePageQuery));
};

export { homePageLoader, homePageQuery };

