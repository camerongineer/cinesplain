import { queryOptions } from "@tanstack/react-query";
import {
    getRecommendedMoviesPath,
    retrieveCredits,
    retrieveMovie,
    retrieveMovies,
    retrieveOmdbMovieDetails
} from "../api/moviesApi";
import { getNumericId } from "../utils/formatUtils";

export const moviePageQuery = (movieId: string | undefined) =>
    queryOptions({
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

export const movieRecommendationsQuery = (movieId: number) =>
    queryOptions({
        queryKey: ["movieRecommendations", movieId],
        queryFn: async () => {
            const recommendations = await retrieveMovies(getRecommendedMoviesPath(movieId));
            return recommendations?.filter((movie: { backdropPath: string }) => movie.backdropPath) ?? null;
        }
    });

export const omdbQuery = (imdbId: string) =>
    queryOptions({
        queryKey: ["moviePageOmdb", imdbId],
        queryFn: async () => retrieveOmdbMovieDetails(imdbId)
    });
