import { Card, CardMedia, CardProps, ImageListItem, ImageListItemBar, styled, useTheme } from "@mui/material";
import { SxProps } from "@mui/system";
import useProgressiveImage from "../../../../hooks/UseProgressiveImage";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";
import Movie from "../../../../types/movie.ts";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";

const StyledCard = styled(Card)`
    min-width: 150px;
    transition: opacity ${(props) => props.theme.transitions.duration.standard}ms ease-in-out;
    cursor: pointer;
    user-select: none;
    scroll-snap-align: start;
`;

const StyledImageListItem = styled(ImageListItem)`
    z-index: 1;

    &:hover {
        font-weight: 900;
    }

    &:hover > img {
        filter: saturate(150%);
    }
`;

interface BackdropImageListItemProps extends CardProps {
    movie: Movie;
    cardStyle?: SxProps;
}

const BackdropImageListItem: React.FC<BackdropImageListItemProps> = ({
    movie,
    cardStyle,
    ...props
}) => {
    const theme = useTheme();
    const { lowRef, highRef, lowUrl, highUrl, lowLoaded, highLoaded, markLowLoaded, markHighLoaded } =
        useProgressiveImage(movie.backdropPath, BACKDROP_SIZE.SM_W300, BACKDROP_SIZE.MD_W780);

    return (
        <StyledCard
            elevation={5}
            sx={cardStyle}
            style={{ opacity: lowLoaded || !movie.backdropPath ? "1" : "0" }}
            {...props}
        >
            <StyledImageListItem>
                <CardMedia
                    component="img"
                    ref={lowRef}
                    image={lowUrl}
                    alt={movie.title}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={markLowLoaded}
                />
                <CardMedia
                    component="img"
                    ref={highRef}
                    image={highUrl}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "50% 15%",
                        opacity: highLoaded ? 1 : 0,
                        transition: `opacity ${theme.transitions.duration.standard}ms ease-in-out`
                    }}
                    onLoad={markHighLoaded}
                />
                <ImageListItemBar
                    title={movie.title}
                    subtitle={movie.releaseDate ? getFormattedDisplayedDate(movie.releaseDate) : ""}
                    position="bottom"
                />
            </StyledImageListItem>
        </StyledCard>
    );
};

export default BackdropImageListItem;
