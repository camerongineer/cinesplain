import imdb from "@assets/imdb_logo.svg";
import { Box, Link as MuiLink, Stack, styled } from "@mui/material";
import { Link, Link as RouterLink } from "react-router-dom";
import { getImdbMoviePath } from "../../../../api/moviesApi.ts";
import omdbMovieDetails from "../../../../types/OmdbMovieDetails.ts";
import Movie from "../../../../types/movie.ts";
import AccoladesDisplay from "../common/AccoladesDisplay.tsx";
import CurrencyDisplay from "../common/CurrencyDisplay";
import DirectorDisplay from "../common/DirectorDisplay.tsx";
import RatingCard from "../common/RatingCard.tsx";
import ReleaseDateDisplay from "../common/ReleaseDateDisplay";
import RuntimeDisplay from "../common/RuntimeDisplay";
import SplainationDisplay from "../common/SplainationDisplay";
import StarringDisplay from "../common/StarringDisplay.tsx";
import TaglineDisplay from "../common/TaglineDisplay";
import WritersDisplay from "../common/WritersDisplay.tsx";

const StyledStack = styled(Stack)`
    justify-content: center;
    align-items: center;
    transition: ${(props) => `opacity ${props.theme.transitions.duration.short}ms ease-in-out`};
    padding: 1em;
    margin: 2em 0;
`;

interface MovieSideBarProps {
    movie: Movie;
    omdbDetails?: omdbMovieDetails | null;
}

const MovieSideBar: React.FC<MovieSideBarProps> = ({ movie, omdbDetails }) => {
    return (
        <StyledStack
            flex={{
                md: 1,
                lg: 1,
            }}
            justifyContent="center"
            padding={1}
            marginX={1}
            order={{
                xs: -1,
                md: 0,
            }}
        >
            {movie.tagline && <TaglineDisplay tagline={movie.tagline} />}
            {movie.overview && <SplainationDisplay overview={movie.overview} />}
            <Stack alignItems="center" spacing={1}>
                <Stack spacing={2} pb={2}>
                    {omdbDetails?.director && omdbDetails?.director !== "N/A" && (
                        <DirectorDisplay director={omdbDetails.director} />
                    )}
                    {omdbDetails?.writer && omdbDetails?.writer !== "N/A" && (
                        <WritersDisplay writers={omdbDetails.writer} />
                    )}
                    {omdbDetails?.actors && omdbDetails?.actors !== "N/A" && (
                        <StarringDisplay stars={omdbDetails.actors} />
                    )}
                    <RatingCard movie={movie} omdbDetails={omdbDetails} />
                </Stack>
                {!!movie.runtime && <RuntimeDisplay runtime={movie.runtime} includeLabel={true} />}
                {!!movie.releaseDate && <ReleaseDateDisplay releaseDate={movie.releaseDate} includeLabel={true} />}
                {!!movie.budget && <CurrencyDisplay labelText="Budget" currencyAmount={movie.budget} />}
                {!!movie.revenue && <CurrencyDisplay labelText="Revenue" currencyAmount={movie.revenue} />}
                {omdbDetails?.awards && omdbDetails?.awards !== "N/A" && (
                    <AccoladesDisplay awards={omdbDetails.awards} />
                )}
                <Stack flexDirection="row" justifyContent="space-evenly" alignItems="center" width="100%">
                    {movie.homepage && (
                        <RouterLink to={movie.homepage} target="_blank" rel="noopener noreferrer">
                            <MuiLink component="span" variant="overline" fontSize="large" fontWeight="bolder">
                                Webpage
                            </MuiLink>
                        </RouterLink>
                    )}
                    {movie.imdbId && (
                        <Link to={getImdbMoviePath(movie.imdbId)} target="_blank" rel="noopener noreferrer">
                            <Box
                                component="img"
                                height="25px"
                                src={imdb as unknown as string}
                                alt="Link to IMDB"
                                mt={0.75}
                            />
                        </Link>
                    )}
                </Stack>
            </Stack>
        </StyledStack>
    );
};

export default MovieSideBar;
