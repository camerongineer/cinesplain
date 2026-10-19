import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import {
    Card,
    CardMedia,
    ImageListItem,
    ImageListItemBar,
    styled,
    Typography
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useRef, useState } from "react";
import { getImagePath } from "../../../../api/moviesApi.ts";
import useImageLoaded from "../../../../hooks/UseImageLoaded";
import { PROFILE_SIZE } from "../../../../constants/ImageSizes";
import listDisplayMovieCastCredit from "../../../../types/listDisplayMovieCastCredit.ts";

const StyledCard = styled(Card)`
    height: fit-content;
    min-width: 200px;
    margin: 5px;
    transition: opacity ${(props) => props.theme.transitions.duration.standard}ms ease-in-out;
    cursor: pointer;
    user-select: none;
`;

interface CastMemberCardProps {
    castMember: listDisplayMovieCastCredit;
    sx?: SxProps;
}

const CastMemberCard: React.FC<CastMemberCardProps> = ({ castMember, sx }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const { imageLoaded, markImageLoaded } = useImageLoaded(imageRef);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const altSilhouette =
        castMember.gender === 1
            ? femaleSilhouette
            : castMember.gender === 2
              ? maleSilhouette
              : neutralSilhouette;

    const handleViewDetails = () => setIsHovered(true);
    const handleCloseDetails = () => setIsHovered(false);

    return (
        <StyledCard
            elevation={5}
            sx={sx}
            style={{ opacity: imageLoaded ? "1" : "0" }}
            onMouseEnter={handleViewDetails}
            onMouseLeave={handleCloseDetails}
            onTouchStart={handleViewDetails}
            onTouchEnd={handleCloseDetails}
        >
            <ImageListItem>
                <CardMedia
                    component="img"
                    ref={imageRef}
                    loading="lazy"
                    image={
                        castMember.profilePath
                            ? getImagePath(castMember.profilePath, PROFILE_SIZE.MD_W185)
                            : altSilhouette
                    }
                    alt={castMember.name}
                    height={210}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={markImageLoaded}
                />
                {isHovered && (
                    <ImageListItemBar
                        title={
                            castMember.character && (
                                <Typography
                                    variant="body2"
                                    sx={{
                                        whiteSpace: "pre-wrap"
                                    }}
                                >
                                    "<strong>{castMember.character}</strong>"
                                </Typography>
                            )
                        }
                        subtitle={
                            <Typography
                                variant="body2"
                                sx={{
                                    whiteSpace: "pre-wrap"
                                }}
                            >
                                {castMember.name}
                            </Typography>
                        }
                    />
                )}
            </ImageListItem>
        </StyledCard>
    );
};

export default CastMemberCard;
