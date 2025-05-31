import { QueryClient, queryOptions } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import {
    getRecommendedMoviesPath,
    retrieveCredits,
    retrieveMovie,
    retrieveMovies,
    retrieveOmdbMovieDetails
} from "../api/moviesApi";
import Credits from "../types/credits";
import Movie from "../types/movie";
import { getNumericId } from "../utils/formatUtils";

interface LoaderData {
    movie: Movie;
    credits: Credits | null;
}

const moviePageQuery = (movieId: string | undefined) => queryOptions({
    queryKey: ["moviePage", movieId],
    queryFn: async (): Promise<LoaderData> => {
        const movie = await retrieveMovie(getNumericId(movieId ?? ""));
        if (!movie) {
            throw new Error("This page doesn't not exist.");
        }
        const credits = await retrieveCredits(movie.id);

        return { movie, credits };
    }
});

const movieRecommendationsQuery = (movieId: number) => ({
    queryKey: ["movieRecommendations", movieId],
    queryFn: async () => {
        let recommendations = await retrieveMovies(getRecommendedMoviesPath(movieId));
        return recommendations?.filter((movie: { backdropPath: string }) => movie.backdropPath) ?? null;
    }
});

const omdbQuery = (imdbId: string) => ({
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

