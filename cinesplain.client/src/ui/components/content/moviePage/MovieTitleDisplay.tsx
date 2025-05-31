import { Box, Grid, styled, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import listDisplayMovieCrewCredit from "../../../../types/listDisplayMovieCrewCredit.ts";
import Movie from "../../../../types/movie.ts";
import omdbMovieDetails from "../../../../types/OmdbMovieDetails.ts";
import Person from "../../../../types/person.ts";
import { getFormattedPersonLinkId } from "../../../../utils/formatUtils.ts";
import PopcornRating from "../../common/PopcornRating.tsx";
import GenreDisplay from "../common/GenreDisplay";
import LogoDisplay from "../common/LogoDisplay";
import ReleaseDateDisplay from "../common/ReleaseDateDisplay";
import RuntimeDisplay from "../common/RuntimeDisplay";
import TitleDisplay from "../common/TitleDisplay";
import MovieCard from "./MovieCard";

const StyledGrid = styled(Grid)`
    width: 100%;
    padding: 5% 0;
    transition: opacity ${(props) => props.theme.transitions.duration.short}ms ease-in-out;
`;

interface MovieTitleDisplayProps {
    movie: Movie;
    omdbDetails?: omdbMovieDetails | null;
    director?: listDisplayMovieCrewCredit;
}

const MovieTitleDisplay: React.FC<MovieTitleDisplayProps> = ({ movie, omdbDetails, director }) => {
    const theme = useTheme();
    const [movieBackdrop, movieBackdropLoading] = useMovieBackdrop(movie);

    const backgroundStyle = {
        background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${movieBackdrop})`,
        backgroundSize: "cover",
        backgroundPosition: "top left",
        color: theme.palette.getContrastText("rgba(0, 0, 0, 0.4)"),
        opacity: !movieBackdropLoading || !movie?.posterPath ? 1 : 0,
        minHeight: "calc(100dvh - 70px)",
        [theme.breakpoints.up("sm")]: {
            minHeight: movie?.posterPath || movie?.backdropPath ? "600px" : "400px",
            height: movie?.posterPath ? "50vh" : "auto"
        }
    };

    return (
        <StyledGrid container sx={backgroundStyle}>
            <Grid size={{ xs: 0, sm: 1 }} />
            {movie.posterPath && (
                <Grid size={{ xs: 12, sm: 4 }}>
                    <Box
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <MovieCard
                            sx={{
                                height: "auto",
                                width: "auto",
                                maxWidth: "min(240px, 75%)",
                                minWidth: 120
                            }}
                            movie={movie}
                            onHover={() => {}}
                            isExpandable={false}
                        />
                    </Box>
                </Grid>
            )}
            <Grid size={{ xs: 0, sm: 1 }} />
            <Grid
                size={{ xs: 12, sm: movie.posterPath ? 5 : 1 }}
                p={{
                    xs: 3,
                    sm: 0
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                {!!movie?.images?.logos?.length && <LogoDisplay logos={movie.images.logos} />}
                {!movie?.images?.logos?.length && <TitleDisplay title={movie.title} />}
                <Box display="flex" flexDirection="row" padding={0.75}>
                    {movie.releaseDate && <ReleaseDateDisplay releaseDate={movie.releaseDate} />}
                    {!!movie.runtime && (
                        <>
                            {movie.releaseDate && <Typography>&nbsp;&nbsp;•&nbsp;&nbsp;</Typography>}
                            <RuntimeDisplay runtime={movie.runtime} />
                        </>
                    )}
                    {omdbDetails?.rated && omdbDetails.rated != "N/A" && (
                        <>
                            {(!!movie.runtime || movie.releaseDate) && (
                                <Typography>&nbsp;&nbsp;•&nbsp;&nbsp;</Typography>
                            )}
                            <Typography>{omdbDetails?.rated}</Typography>
                        </>
                    )}
                </Box>
                {director && (
                    <Typography
                        component={Link}
                        to={`/person/${getFormattedPersonLinkId(director as unknown as Person)}`}
                        p={0.75}
                        paddingBottom={2}
                        sx={({palette}) =>({ color: palette.getContrastText("rgba(0, 0, 0, 0.4)") })}
                    >
                        <strong>Directed&nbsp;By:&nbsp;</strong>
                        {director.name}
                    </Typography>
                )}
                {movie.voteCount >= 10 && (
                    <>
                        <PopcornRating voteAverage={movie.voteAverage} width="45px" />
                    </>
                )}
                {movie.genres && <GenreDisplay genres={movie.genres} />}
            </Grid>
            <Grid size={{ xs: 0, sm: 1 }} />
        </StyledGrid>
    );
};

export default MovieTitleDisplay;
