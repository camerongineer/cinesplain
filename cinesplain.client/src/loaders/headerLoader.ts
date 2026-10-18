import { QueryClient, queryOptions } from "@tanstack/react-query";
import { getPopularMoviesPath, retrieveMovies } from "../api/moviesApi";

const headerQuery = queryOptions({
    queryKey: ["headerData"],
    queryFn: async () => await retrieveMovies(getPopularMoviesPath(1))
});

const headerLoader = (queryClient: QueryClient) => async () => {
    await queryClient.ensureQueryData(headerQuery);
};

export { headerQuery, headerLoader };
