import { FetchQueryOptions, QueryClient } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import
    {
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

const moviePageQuery = (movieId: string | undefined): FetchQueryOptions<LoaderData> => ({
    queryKey: ["moviePage", movieId],
    queryFn: async (): Promise<LoaderData> => {
        if (!movieId) {
            throw new Error("This page doesn't not exist.");
        }
        const moviePromise = await retrieveMovie(getNumericId(movieId ?? ""));
        const creditsPromise = await retrieveCredits(parseInt(movieId));
        const [movie, credits] = await Promise.all([moviePromise, creditsPromise]);
        if (!movie) {
            throw new Error("This page doesn't not exist.");
        }

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
        const query = moviePageQuery(movieId);
        const data: LoaderData | undefined = queryClient.getQueryData(query.queryKey);
        return data ?? (await queryClient.fetchQuery(moviePageQuery(movieId)));
    };

export { moviePageLoader, moviePageQuery, movieRecommendationsQuery, omdbQuery };

