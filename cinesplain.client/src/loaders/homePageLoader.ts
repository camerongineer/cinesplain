import { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import
    {
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
        const recentMoviesPromise = retrieveMovies(getNowPlayingMoviesPath());
        const lovedMoviesPromise = retrieveMovies(getMostLovedMoviesPath());
        const hatedMoviesPromise = retrieveMovies(getMostHatedMoviesPath());
        const classicMoviesPromise = retrieveMovies(getClassicMoviesPath());
        const upcomingMoviesPromise = retrieveMovies(getUpcomingMoviesPath());
        const [recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies] = await Promise.all([
            recentMoviesPromise,
            lovedMoviesPromise,
            hatedMoviesPromise,
            classicMoviesPromise,
            upcomingMoviesPromise
        ]);
        return { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies };
    }
};

const homePageLoader = (queryClient: QueryClient) => async () => {
    const data: LoaderData | undefined = queryClient.getQueryData(homePageQuery.queryKey);
    return data ?? (await queryClient.fetchQuery(homePageQuery));
};

export { homePageLoader, homePageQuery };

