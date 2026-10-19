import { Stack, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import {
    moviePageQuery,
    movieRecommendationsQuery,
    omdbQuery
} from "../../../../queries/moviePage.ts";
import CastMemberRow from "../common/CastMemberRow";
import MovieCreditsListsDisplay from "./MovieCreditsListsDisplay.tsx";
import MovieRecommendations from "./MovieRecommendations";
import MovieSideBar from "./MovieSideBar";
import MovieTitleDisplay from "./MovieTitleDisplay";
import TrailerDisplay from "./TrailerDisplay";

const StyledMoviePage = styled(Stack)`
    justify-content: center;
    text-align: center;
`;

const MoviePage: React.FC<{ movieId: string }> = ({ movieId }) => {
    const { data: movieData } = useQuery(moviePageQuery(movieId));
    const movieImdbId = movieData?.movie.imdbId;
    const { data: omdbDetails } = useQuery({
        ...omdbQuery(movieImdbId ?? ""),
        enabled: !!movieImdbId
    });
    const numericMovieId = movieData?.movie.id;
    const { data: recommendations } = useQuery({
        ...movieRecommendationsQuery(numericMovieId ?? 0),
        enabled: !!numericMovieId
    });

    const releaseYear = movieData
        ? new Date(movieData.movie.releaseDate ?? "").getFullYear()
        : null;
    useEffect(() => {
        if (movieData?.movie.title) {
            document.title = `${movieData.movie.title} ${releaseYear ? `(${releaseYear}) ` : ""} - CineSplain - The Movie Info App`;
        }
    }, [movieData?.movie.title, movieData?.movie.releaseDate, releaseYear]);

    if (!movieData) return null;
    const { movie, credits } = movieData;
    const displayedCast = credits?.cast.filter((castMember) => castMember.profilePath) ?? null;
    const director = credits?.crew.find((crewMember) => crewMember.name === omdbDetails?.director);

    return (
        <>
            {movie && (
                <StyledMoviePage className="full" key={movie.id}>
                    <MovieTitleDisplay
                        key={movie.id}
                        movie={movie}
                        omdbDetails={omdbDetails}
                        director={director}
                    />
                    {displayedCast && <CastMemberRow castMembers={displayedCast} />}
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
                            <MovieCreditsListsDisplay credits={credits} />
                        </Stack>
                        <MovieSideBar movie={movie} omdbDetails={omdbDetails} />
                    </Stack>

                    {!!recommendations?.length && (
                        <MovieRecommendations recommendedMovies={recommendations} />
                    )}
                </StyledMoviePage>
            )}
        </>
    );
};

export default MoviePage;
