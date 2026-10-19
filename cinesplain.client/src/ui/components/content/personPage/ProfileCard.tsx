import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import { Box, Card, CardMedia, styled, useTheme } from "@mui/material";
import useProgressiveImage from "../../../../hooks/UseProgressiveImage";
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
    const theme = useTheme();
    const { lowRef, highRef, lowUrl, highUrl, lowLoaded, highLoaded, markLowLoaded, markHighLoaded } =
        useProgressiveImage(
            person.profilePath ?? "",
            person.profilePath ? PROFILE_SIZE.MD_W185 : PROFILE_SIZE.LG_H632,
            PROFILE_SIZE.LG_H632
        );
    const altSilhouette =
        person.gender === 1
            ? femaleSilhouette
            : person.gender === 2
              ? maleSilhouette
              : neutralSilhouette;

    return (
        <StyledCard
            sx={{
                opacity: lowLoaded || !person.profilePath ? 1 : 0,
                minHeight: lowLoaded || !person.profilePath ? "" : "420px"
            }}
        >
            <Box sx={{ position: "relative", height: "100%" }}>
                <CardMedia
                    component="img"
                    ref={lowRef}
                    loading="lazy"
                    image={person.profilePath ? lowUrl : altSilhouette}
                    alt={person.name}
                    onLoad={markLowLoaded}
                    sx={{ height: "100%", objectFit: "cover" }}
                />
                {person.profilePath && (
                    <CardMedia
                        component="img"
                        ref={highRef}
                        loading="lazy"
                        image={highUrl}
                        alt=""
                        aria-hidden="true"
                        onLoad={markHighLoaded}
                        style={{
                            position: "absolute",
                            inset: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: highLoaded ? 1 : 0,
                            transition: `opacity ${theme.transitions.duration.short}ms ease-in-out`
                        }}
                    />
                )}
            </Box>
        </StyledCard>
    );
};

export default ProfileCard;
