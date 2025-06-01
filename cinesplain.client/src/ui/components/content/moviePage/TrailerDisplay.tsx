import { Skeleton, Stack, styled } from "@mui/material";
import { useState } from "react";
import { getYouTubeTrailerPath } from "../../../../api/moviesApi.ts";
import Movie from "../../../../types/movie.ts";
import Video from "../../../../types/video.ts";

const StyledStack = styled(Stack)`
    width: 100%;
`;

const StyledIframe = styled("iframe")`
    width: 100%;
    padding: 0;
    border: 0;
    aspect-ratio: 16 / 9;
    border: 0;
`;

interface TrailerCardProps {
    movie: Movie;
    trailer: Video | null;
}

const TrailerDisplay: React.FC<TrailerCardProps> = ({ movie, trailer }) => {
    const [isError, setIsError] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    if (!trailer || isError) return null;
    return (
        <StyledStack>
            <Stack
                sx={{ position: "relative", width: "100%", paddingTop: "56.25%", display: isLoading ? "flex" : "none" }}
            >
                <Skeleton
                    variant="rectangular"
                    sx={{
                        borderRadius: 1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }}
                />
            </Stack>
            <StyledIframe
                className="center"
                allow=""
                src={getYouTubeTrailerPath(trailer.key)}
                title={`${movie.title} trailer`}
                allowFullScreen
                loading="lazy"
                onError={() => setIsError(true)}
                onLoad={() => setIsLoading(false)}
                style={{ height: isLoading ? 0 : "auto" }}
            />
        </StyledStack>
    );
};

export default TrailerDisplay;
