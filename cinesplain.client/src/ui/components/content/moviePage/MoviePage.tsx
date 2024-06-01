import { Stack, styled } from "@mui/material";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Params, useLoaderData, useParams } from "react-router-dom";
import {
    getRecommendedMoviesPath,
    retrieveCredits,
    retrieveMovie,
    retrieveMovies,
    retrieveOmdbMovieDetails
} from "../../../../api/moviesApi.ts";
import OmdbMovieDetails from "../../../../types/OmdbMovieDetails.ts";
import Credits from "../../../../types/credits.ts";
import Movie from "../../../../types/movie.ts";
import { getNumericId } from "../../../../utils/formatUtils.ts";
import CastMemberRow from "../common/CastMemberRow";
import { personPageLoader } from "../personPage/PersonPage.tsx";
import MovieCreditsListsDisplay from "./MovieCreditsListsDisplay.tsx";
import MovieRecommendations from "./MovieRecommendations";
import MovieSideBar from "./MovieSideBar";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";

const StyledMoviePage = styled(Stack)`
    justify-content: center;
    text-align: center;
`;

const moviePageQuery = (movieId: string | undefined) => ({
    queryKey: ["moviePage", movieId],
    queryFn: async (): Promise<LoaderData | null> => {
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
        return (
            queryClient.getQueryData(moviePageQuery(movieId).queryKey) ??
            (await queryClient.fetchQuery(moviePageQuery(movieId)))
        );
    };

interface LoaderData {
    movie: Movie;
    credits: Credits | null;
}

const MoviePage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof personPageLoader>>>;
    const params = useParams();
    const { data: imdbData } = useQuery({ ...moviePageQuery(params.movieId), initialData });
    const { movie, credits } = imdbData as LoaderData;
    const { data: omdbData } = useQuery({ ...omdbQuery(movie.imdbId) });
    const omdbDetails = omdbData as OmdbMovieDetails;
    const { data: recommendationsData } = useQuery({ ...movieRecommendationsQuery(movie.id) });
    const recommendations = recommendationsData as Movie[];

    const displayedCast = credits?.cast.filter((castMember) => castMember.profilePath) ?? null;
    const director = credits?.crew.find((crewMember) => crewMember.name === omdbDetails?.director);

    useEffect(() => {
        const releaseYear = new Date(movie.releaseDate ?? "").getFullYear();
        document.title = `${movie.title} ${releaseYear ? `(${releaseYear}) ` : ""} - CineSplain - The Movie Info App`;
    }, [movie.title]);

    return (
        <>
            {movie && (
                <StyledMoviePage className="full" key={movie.id}>
                    <MovieTitleDisplay key={movie.id} movie={movie} omdbDetails={omdbDetails} director={director} />
                    {displayedCast && <CastMemberRow castMembers={displayedCast} />}
                    <Stack
                        flexDirection={{
                            lg: "row"
                        }}
                        alignItems={{
                            xs: "center",
                            lg: "start"
                        }}
                        justifyContent="space-evenly"
                        padding={1}
                    >
                        <Stack
                            className="full center"
                            pt={1}
                            spacing={2}
                            flex={{
                                md: 1,
                                lg: 2
                            }}
                        >
                            {movie.trailer && <TrailerDisplay movie={movie} trailer={movie.trailer} />}
                            <MovieCreditsListsDisplay credits={credits} />
                        </Stack>
                        <MovieSideBar movie={movie} omdbDetails={omdbDetails} />
                    </Stack>

                    {!!recommendations?.length && <MovieRecommendations recommendedMovies={recommendations} />}
                </StyledMoviePage>
            )}
        </>
    );
};

export { moviePageLoader };
export default MoviePage;
