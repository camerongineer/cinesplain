import { QueryClient, queryOptions } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import {
    getRecommendedMoviesPath,
    retrieveCredits,
    retrieveMovie,
    retrieveMovies,
    retrieveOmdbMovieDetails
} from "../api/moviesApi";
import { getNumericId } from "../utils/formatUtils";

const moviePageQuery = (movieId: string | undefined) => queryOptions({
    queryKey: ["moviePage", movieId],
    queryFn: async () => {
        const movie = await retrieveMovie(getNumericId(movieId ?? ""));
        if (!movie) {
            throw new Error("This page doesn't not exist.");
        }
        const credits = await retrieveCredits(movie.id);

        return { movie, credits };
    }
});

const movieRecommendationsQuery = (movieId: number) => queryOptions({
    queryKey: ["movieRecommendations", movieId],
    queryFn: async () => {
        let recommendations = await retrieveMovies(getRecommendedMoviesPath(movieId));
        return recommendations?.filter((movie: { backdropPath: string }) => movie.backdropPath) ?? null;
    }
});

const omdbQuery = (imdbId: string) => queryOptions({
    queryKey: ["moviePageOmdb", imdbId],
    queryFn: async () => retrieveOmdbMovieDetails(imdbId)
});

const moviePageLoader =
    (queryClient: QueryClient) =>
    async ({ params }: { params: Params }) => {
        const movieId = params.movieId;
        await queryClient.ensureQueryData(moviePageQuery(movieId));
    };

export { moviePageLoader, moviePageQuery, movieRecommendationsQuery, omdbQuery };

