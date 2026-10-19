import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import { Card, CardMedia, styled } from "@mui/material";
import { useRef } from "react";
import { getImagePath } from "../../../../api/moviesApi.ts";
import useImageLoaded from "../../../../hooks/UseImageLoaded";
import { PROFILE_SIZE } from "../../../../constants/ImageSizes.ts";
import Person from "../../../../types/person.ts";

const StyledCard = styled(Card)`
    width: 280px;
    max-height: 632px;
    background: ${(props) => props.theme.palette.background.paper};
    transition:
        height 2s ease-in-out,
        opacity ${(props) => props.theme.transitions.duration.short}ms ease-in-out;
`;

interface ProfileCardProps {
    person: Person;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ person }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const { imageLoaded, markImageLoaded } = useImageLoaded(imageRef);
    const altSilhouette =
        person.gender === 1
            ? femaleSilhouette
            : person.gender === 2
              ? maleSilhouette
              : neutralSilhouette;

    return (
        <StyledCard
            sx={{
                opacity: imageLoaded || !person.profilePath ? 1 : 0,
                minHeight: imageLoaded || !person.profilePath ? "" : "420px"
            }}
        >
            <CardMedia
                component="img"
                ref={imageRef}
                loading="lazy"
                image={
                    person.profilePath
                        ? getImagePath(person.profilePath, PROFILE_SIZE.LG_H632)
                        : altSilhouette
                }
                alt={person.name}
                onLoad={markImageLoaded}
                sx={{ height: "100%", objectFit: "cover" }}
            />
        </StyledCard>
    );
};

export default ProfileCard;
