import { Stack, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { moviePageLoader, moviePageQuery, movieRecommendationsQuery, omdbQuery } from "../../../../loaders/moviePageLoader.ts";
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

const MoviePage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof moviePageLoader>>>;
    const params = useParams();
    const { data: { movie, credits} } = useQuery({ ...moviePageQuery(params.movieId), initialData });
    const { data: omdbDetails } = useQuery(omdbQuery(movie.imdbId));
    const { data: recommendations } = useQuery(movieRecommendationsQuery(movie.id));

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

export default MoviePage;