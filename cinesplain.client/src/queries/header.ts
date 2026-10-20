import { queryOptions } from "@tanstack/react-query";
import { getPopularMoviesPath, retrieveMovies } from "../api/moviesApi";

export const headerQuery = queryOptions({
    queryKey: ["headerData"],
    queryFn: async () => retrieveMovies(getPopularMoviesPath(1))
});
