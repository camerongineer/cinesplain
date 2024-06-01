import { Box, Card, CardContent, CardHeader, CardMedia, CardProps, Stack, styled, Typography } from "@mui/material";
import { useState } from "react";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { POSTER_SIZE } from "../../../../constants/ImageSizes";
import Movie from "../../../../types/movie.ts";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";
import PopcornRating from "../../common/PopcornRating.tsx";

const StyledCard = styled(Card)`
    position: relative;
    background: ${(props) => props.theme.palette.background.paper};
    transition: height 2s ease-in-out, opacity ${(props) => props.theme.transitions.duration.complex}ms ease-in-out;
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
    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const handleMouseHovered = () => {
        setIsHovered(true);
        onHover(movie.backdropPath);
    };

    const handleMouseNotHovered = () => {
        setIsHovered(false);
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <StyledCard
            variant="outlined"
            style={{
                animation: `Card-Wobble infinite ${movie.voteAverage ? 4 * (movie.voteAverage / 10) : 3}s alternate`,
                visibility: imageLoaded || !movie.posterPath ? "visible" : "hidden",
                opacity: imageLoaded || !movie.posterPath ? 1 : 0
            }}
            onMouseEnter={handleMouseHovered}
            onMouseLeave={handleMouseNotHovered}
            {...props}
        >
            {movie.posterPath && (
                <CardMedia
                    component="img"
                    image={getImagePath(movie.posterPath, posterSize)}
                    alt="Movie Poster"
                    onLoad={handleImageLoad}
                />
            )}
            {isExpandable && (
                <Box
                    className="hover-content"
                    style={{
                        height: isHovered || !imageLoaded || !movie.posterPath ? "auto" : "0",
                        overflow: "hidden"
                    }}
                >
                    <CardHeader
                        title={
                            <Stack direction="row" justifyContent="space-between">
                                <Stack>
                                    <Typography variant="h6">{movie.title}</Typography>
                                    {movie.releaseDate && (
                                        <Typography>{getFormattedDisplayedDate(movie.releaseDate)}</Typography>
                                    )}
                                </Stack>
                                {movie.voteCount > 5 && movie.voteAverage && (
                                    <Stack fontSize="smaller" mr={0.5} mt={0.5}>
                                        <PopcornRating voteAverage={movie.voteAverage} width="50px" />
                                    </Stack>
                                )}
                            </Stack>
                        }
                    />
                    {movie.overview && (
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
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
