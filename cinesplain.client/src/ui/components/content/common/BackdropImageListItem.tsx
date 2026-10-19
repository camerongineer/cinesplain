import { Card, CardMedia, CardProps, ImageListItem, ImageListItemBar, styled } from "@mui/material";
import { SxProps } from "@mui/system";
import { useRef } from "react";
import { getImagePath } from "../../../../api/moviesApi.ts";
import useImageLoaded from "../../../../hooks/UseImageLoaded";
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
    const imageRef = useRef<HTMLImageElement>(null);
    const { imageLoaded, markImageLoaded } = useImageLoaded(imageRef);

    return (
        <StyledCard
            elevation={5}
            sx={cardStyle}
            style={{ opacity: imageLoaded ? "1" : "0" }}
            {...props}
        >
            <StyledImageListItem>
                <CardMedia
                    component="img"
                    ref={imageRef}
                    image={getImagePath(movie.backdropPath, BACKDROP_SIZE.MD_W780)}
                    alt={movie.title}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={markImageLoaded}
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
