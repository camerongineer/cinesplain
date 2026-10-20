import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import {
    Card,
    CardMedia,
    ImageListItem,
    ImageListItemBar,
    styled,
    Typography,
    useTheme
} from "@mui/material";
import { SxProps } from "@mui/system";
import { useState } from "react";
import useProgressiveImage from "../../../../hooks/UseProgressiveImage";
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
    const theme = useTheme();
    const { lowRef, highRef, lowUrl, highUrl, highLoaded, markLowLoaded, markHighLoaded } =
        useProgressiveImage(
            castMember.profilePath ?? "",
            castMember.profilePath ? PROFILE_SIZE.SM_W45 : PROFILE_SIZE.MD_W185,
            PROFILE_SIZE.MD_W185
        );
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
            onMouseEnter={handleViewDetails}
            onMouseLeave={handleCloseDetails}
            onTouchStart={handleViewDetails}
            onTouchEnd={handleCloseDetails}
        >
            <ImageListItem>
                <CardMedia
                    component="img"
                    ref={lowRef}
                    loading="lazy"
                    image={
                        castMember.profilePath
                            ? lowUrl
                            : altSilhouette
                    }
                    alt={castMember.name}
                    height={210}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={markLowLoaded}
                />
                {castMember.profilePath && (
                    <CardMedia
                        component="img"
                        ref={highRef}
                        loading="lazy"
                        image={highUrl}
                        alt=""
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: 210,
                            objectFit: "cover",
                            objectPosition: "50% 15%",
                            opacity: highLoaded ? 1 : 0,
                            transition: `opacity ${theme.transitions.duration.standard}ms ease-in-out`
                        }}
                        onLoad={markHighLoaded}
                    />
                )}
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
