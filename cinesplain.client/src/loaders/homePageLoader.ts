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
        const recentMovies = await retrieveMovies(getNowPlayingMoviesPath());
        const lovedMovies = await retrieveMovies(getMostLovedMoviesPath());
        const hatedMovies = await retrieveMovies(getMostHatedMoviesPath());
        const classicMovies = await retrieveMovies(getClassicMoviesPath());
        const upcomingMovies = await retrieveMovies(getUpcomingMoviesPath());
        return { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies };
    }
};

const homePageLoader = (queryClient: QueryClient) => async () => {
    const data: LoaderData | undefined = queryClient.getQueryData(homePageQuery.queryKey);
    return data ?? (await queryClient.fetchQuery(homePageQuery));
};

export { homePageLoader, homePageQuery };

