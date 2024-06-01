import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import { Card, CardMedia, ImageListItem, ImageListItemBar, styled, Typography } from "@mui/material";
import { SxProps } from "@mui/system";
import { useState } from "react";
import { getImagePath } from "../../../../api/moviesApi.ts";
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
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    const altSilhouette =
        castMember.gender === 1 ? femaleSilhouette : castMember.gender === 2 ? maleSilhouette : neutralSilhouette;

    const handleViewDetails = () => setIsHovered(true);
    const handleCloseDetails = () => setIsHovered(false);

    return (
        <StyledCard
            elevation={5}
            sx={sx}
            style={{ opacity: loading ? "0" : "1" }}
            onMouseEnter={handleViewDetails}
            onMouseLeave={handleCloseDetails}
            onTouchStart={handleViewDetails}
            onTouchEnd={handleCloseDetails}
        >
            <ImageListItem>
                <CardMedia
                    component="img"
                    loading="lazy"
                    image={
                        castMember.profilePath
                            ? getImagePath(castMember.profilePath, PROFILE_SIZE.MD_W185)
                            : altSilhouette
                    }
                    alt={castMember.name}
                    height={210}
                    style={{ objectPosition: "50% 15%" }}
                    onLoad={() => setLoading(false)}
                />
                {isHovered && (
                    <ImageListItemBar
                        title={
                            castMember.character && (
                                <Typography variant="body2" whiteSpace="pre-wrap">
                                    "<strong>{castMember.character}</strong>"
                                </Typography>
                            )
                        }
                        subtitle={
                            <Typography variant="body2" whiteSpace="pre-wrap">
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
