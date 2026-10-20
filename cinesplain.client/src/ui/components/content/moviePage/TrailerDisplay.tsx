import { Skeleton, Stack, styled } from "@mui/material";
import { useEffect, useRef, useState } from "react";
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
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        // An iframe server-rendered into the HTML can finish loading before
        // React hydrates and attaches onLoad. Accessing contentWindow on a
        // cross-origin document throws, while it resolves to about:blank
        // while the initial navigation is still pending; so a thrown error
        // means the document already loaded.
        const iframe = iframeRef.current;
        if (!iframe) {
            return;
        }
        try {
            if (iframe.contentWindow?.location.href === "about:blank") {
                return;
            }
        } catch {
            // ignore: the cross-origin document is loaded
        }
        setIsLoading(false);
    }, []);

    if (!trailer || isError) return null;
    return (
        <StyledStack>
            <Stack
                sx={{
                    position: "relative",
                    width: "100%",
                    paddingTop: "56.25%",
                    display: isLoading ? "flex" : "none"
                }}
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
                ref={iframeRef}
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
