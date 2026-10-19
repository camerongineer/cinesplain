import { Stack, styled } from "@mui/material";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import {
    movieCreditsQuery,
    moviePageQuery,
    movieRecommendationsQuery,
    omdbQuery
} from "../../../../queries/moviePage.ts";
import MovieCreditsListsDisplay from "./MovieCreditsListsDisplay.tsx";
import MovieRecommendations from "./MovieRecommendations";
import MovieSideBar from "./MovieSideBar";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";
import MovieCastRow from "./MovieCastRow.tsx";

const StyledMoviePage = styled(Stack)`
    justify-content: center;
    text-align: center;
`;

const MoviePage: React.FC<{ movieId: string }> = ({ movieId }) => {
    // The movie record drives the whole page and suspends on it; the cast row
    // and credits lists stream independently in their own boundaries below, and
    // omdb details / recommendations hydrate once their dependencies exist.
    const { data: movie } = useSuspenseQuery(moviePageQuery(movieId));
    const movieImdbId = movie.imdbId;
    const { data: omdbDetails } = useQuery({
        ...omdbQuery(movieImdbId ?? ""),
        enabled: !!movieImdbId
    });
    const numericMovieId = movie.id;
    const { data: recommendations } = useQuery({
        ...movieRecommendationsQuery(numericMovieId),
        enabled: !!numericMovieId
    });
    // Read-only view of the credits cache; the streamed cast/credits sections
    // fetch it, and the director line updates when the data lands.
    const { data: credits } = useQuery({
        ...movieCreditsQuery(numericMovieId),
        enabled: !!numericMovieId
    });

    const releaseYear = new Date(movie.releaseDate ?? "").getFullYear();
    useEffect(() => {
        document.title = `${movie.title} (${releaseYear}) - CineSplain - The Movie Info App`;
    }, [movie.title, movie.releaseDate, releaseYear]);

    const director = credits?.crew.find((crewMember) => crewMember.name === omdbDetails?.director);

    return (
        <>
            <StyledMoviePage className="full" key={movie.id}>
                <MovieTitleDisplay
                    key={movie.id}
                    movie={movie}
                    omdbDetails={omdbDetails}
                    director={director}
                />
                <Suspense fallback={null}>
                    <MovieCastRow movieId={movie.id} />
                </Suspense>
                <Stack
                    sx={{
                        flexDirection: {
                            lg: "row"
                        },

                        alignItems: {
                            xs: "center",
                            lg: "start"
                        },

                        justifyContent: "space-evenly",
                        padding: 1
                    }}
                >
                    <Stack
                        className="full center"
                        spacing={2}
                        sx={{
                            pt: 1,

                            flex: {
                                md: 1,
                                lg: 2
                            }
                        }}
                    >
                        <TrailerDisplay movie={movie} trailer={movie.trailer} />
                        <Suspense fallback={null}>
                            <MovieCreditsListsDisplay movieId={movie.id} />
                        </Suspense>
                    </Stack>
                    <MovieSideBar movie={movie} omdbDetails={omdbDetails} />
                </Stack>

                {!!recommendations?.length && (
                    <MovieRecommendations recommendedMovies={recommendations} />
                )}
            </StyledMoviePage>
        </>
    );
};

export default MoviePage;
