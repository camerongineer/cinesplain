import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CardProps,
    Stack,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import { useState } from "react";
import { POSTER_SIZE } from "../../../../constants/ImageSizes";
import Movie from "../../../../types/movie.ts";
import useProgressiveImage from "../../../../hooks/UseProgressiveImage";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import PopcornRating from "../../common/PopcornRating.tsx";

const StyledCard = styled(Card)`
    position: relative;
    background: ${(props) => props.theme.palette.background.paper};
    transition:
        height 2s ease-in-out,
        opacity ${(props) => props.theme.transitions.duration.complex}ms ease-in-out;
    @keyframes Card-Wobble {
        from {
            transform: rotate(-1deg);
        }
        to {
            transform: rotate(1deg);
        }
    }
`;

export interface MovieCardProps extends CardProps {
    movie: Movie;
    posterSize?: string;
    onHover: (backdropPath: string) => void;
    isExpandable: boolean;
}

const MovieCard: React.FC<MovieCardProps> = ({
    movie,
    posterSize = POSTER_SIZE.LG_W780,
    onHover,
    isExpandable,
    ...props
}) => {
    const theme = useTheme();
    const { lowRef, highRef, lowUrl, highUrl, highLoaded, markLowLoaded, markHighLoaded } =
        useProgressiveImage(movie.posterPath ?? "", POSTER_SIZE.XXS_W154, posterSize);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseHovered = () => {
        setIsHovered(true);
        onHover(movie.backdropPath);
    };

    const handleMouseNotHovered = () => {
        setIsHovered(false);
    };

    const highResolutionPosterStyle = {
        position: "absolute" as const,
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover" as const,
        opacity: highLoaded ? 1 : 0,
        transition: `opacity ${theme.transitions.duration.complex}ms ease-in-out`
    };

    return (
        <StyledCard
            variant="outlined"
            style={{
                animation: `Card-Wobble infinite ${movie.voteAverage ? 4 * (movie.voteAverage / 10) : 3}s alternate`
            }}
            onMouseEnter={handleMouseHovered}
            onMouseLeave={handleMouseNotHovered}
            {...props}
        >
            {movie.posterPath && (
                <Box sx={{ position: "relative" }}>
                    <CardMedia
                        component="img"
                        ref={lowRef}
                        image={lowUrl}
                        alt="Movie Poster"
                        sx={{ aspectRatio: "2 / 3", objectFit: "cover" }}
                        onLoad={markLowLoaded}
                    />
                    <CardMedia
                        component="img"
                        ref={highRef}
                        image={highUrl}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        style={highResolutionPosterStyle}
                        onLoad={markHighLoaded}
                    />
                </Box>
            )}
            {isExpandable && (
                <Box
                    className="hover-content"
                    style={{
                        height: isHovered || !movie.posterPath ? "auto" : "0",
                        overflow: "hidden"
                    }}
                >
                    <CardHeader
                        title={
                            <Stack
                                direction="row"
                                sx={{
                                    justifyContent: "space-between"
                                }}
                            >
                                <Stack>
                                    <Typography variant="h6">{movie.title}</Typography>
                                    {movie.releaseDate && (
                                        <Typography>
                                            {getFormattedDisplayedDate(movie.releaseDate)}
                                        </Typography>
                                    )}
                                </Stack>
                                {movie.voteCount > 5 && movie.voteAverage && (
                                    <Stack
                                        sx={{
                                            fontSize: "smaller",
                                            mr: 0.5,
                                            mt: 0.5
                                        }}
                                    >
                                        <PopcornRating
                                            voteAverage={movie.voteAverage}
                                            width="50px"
                                        />
                                    </Stack>
                                )}
                            </Stack>
                        }
                    />
                    {movie.overview && (
                        <CardContent>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: "text.secondary"
                                }}
                            >
                                {`${movie.overview.substring(0, 200)}${movie.overview.length > 200 ? "..." : ""}`}
                            </Typography>
                        </CardContent>
                    )}
                </Box>
            )}
        </StyledCard>
    );
};

export default MovieCard;
