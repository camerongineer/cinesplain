import { Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { personPageLoader, personPageQuery } from "../../../../loaders/personPageLoader.ts";
import CreditsListsDisplay from "./CreditsListsDisplay.tsx";
import PersonSideBar from "./PersonSideBar.tsx";
import ProfileCard from "./ProfileCard.tsx";

const StyledStack = styled(Stack)`
    padding: 1em;
`;

const PersonPage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof personPageLoader>>>;
    const params = useParams();
    const {
        data: { person, movieCastCredits, movieCrewCredits }
    } = useQuery({ ...personPageQuery(params.personId), initialData });
    const theme = useTheme();
    const isXSScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isSMScreen = useMediaQuery(theme.breakpoints.down("md"));

    useEffect(() => {
        document.title = `${person.name} - CineSplain - The Movie Info App`;
    }, [person.name]);

    return (
        <StyledStack className="full center">
            {person && (
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    justifyContent="space-evenly"
                >
                    <Stack
                        minHeight="100%"
                        alignItems={{
                            xs: "center",
                            sm: "end"
                        }}
                        textAlign={{
                            xs: "center",
                            sm: "right"
                        }}
                        padding={2}
                        spacing={2}
                    >
                        <Typography component="h1" variant="h3" fontWeight="bolder">
                            {person.name}
                        </Typography>
                        {person.alsoKnownAs.length > 0 && (
                            <Stack>
                                <Typography variant="h5">Also known as</Typography>
                                {person.alsoKnownAs.map((name, index) => {
                                    return (
                                        <Typography key={`${name}${index}`} variant="subtitle1">
                                            {name}
                                        </Typography>
                                    );
                                })}
                            </Stack>
                        )}
                        {isXSScreen && <PersonSideBar person={person} />}
                        <Typography component="p" variant="body1" maxWidth="clamp(30em, 40em, 50em)">
                            {person.biography}
                        </Typography>
                        {!isSMScreen && (
                            <CreditsListsDisplay
                                movieCastCredits={movieCastCredits}
                                movieCrewCredits={movieCrewCredits}
                                showCrewFirst={person.knownForDepartment !== "Acting"}
                            />
                        )}
                    </Stack>
                    <Stack
                        alignItems={{
                            xs: "center",
                            sm: "right"
                        }}
                        spacing={2}
                        padding={1}
                        order={{
                            xs: -1,
                            sm: 0
                        }}
                    >
                        <ProfileCard person={person} />
                        {!isXSScreen && <PersonSideBar person={person} />}
                    </Stack>
                </Stack>
            )}
            {isSMScreen && (
                <CreditsListsDisplay
                    movieCastCredits={movieCastCredits}
                    movieCrewCredits={movieCrewCredits}
                    showCrewFirst={person.knownForDepartment !== "Acting"}
                />
            )}
        </StyledStack>
    );
};

export default PersonPage;
