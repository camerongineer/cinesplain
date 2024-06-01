import { Box, Stack, styled } from "@mui/material";
import { getYouTubeTrailerPath } from "../../../../api/moviesApi.ts";
import Movie from "../../../../types/movie.ts";
import Video from "../../../../types/video.ts";

const StyledStack = styled(Stack)`
    width: 100%;
`;

interface TrailerCardProps {
    movie: Movie;
    trailer: Video;
}

const TrailerDisplay: React.FC<TrailerCardProps> = ({ movie, trailer }) => {
    return (
        <>
            {trailer && (
                <StyledStack>
                    <Box
                        className="center"
                        component="iframe"
                        width="100%"
                        padding={{
                            xs: 0,
                            sm: 1,
                            md: 2
                        }}
                        border={0}
                        style={{ aspectRatio: "16/9" }}
                        allow=""
                        src={getYouTubeTrailerPath(trailer.key)}
                        title={`${movie.title} trailer`}
                        allowFullScreen
                    />
                </StyledStack>
            )}
        </>
    );
};

export default TrailerDisplay;
