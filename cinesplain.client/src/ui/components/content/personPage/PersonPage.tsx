import { Stack, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { personPageQuery } from "../../../../queries/personPage.ts";
import CreditsListsDisplay from "./CreditsListsDisplay.tsx";
import PersonSideBar from "./PersonSideBar.tsx";
import ProfileCard from "./ProfileCard.tsx";

const StyledStack = styled(Stack)`
    padding: 1em;
`;

const PersonPage: React.FC<{ personId: string }> = ({ personId }) => {
    const { data } = useSuspenseQuery(personPageQuery(personId));
    const theme = useTheme();
    const isXSScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isSMScreen = useMediaQuery(theme.breakpoints.down("md"));
    const { person, movieCastCredits, movieCrewCredits } = data;
    const personName = person.name;

    useEffect(() => {
        if (personName) {
            document.title = `${personName} - CineSplain - The Movie Info App`;
        }
    }, [personName]);

    return (
        <StyledStack className="full center">
            {person && (
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row"
                    }}
                    sx={{
                        justifyContent: "space-evenly"
                    }}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            minHeight: "100%",

                            alignItems: {
                                xs: "center",
                                sm: "end"
                            },

                            textAlign: {
                                xs: "center",
                                sm: "right"
                            },

                            padding: 2
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h3"
                            sx={{
                                fontWeight: "bolder"
                            }}
                        >
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
                        <Typography
                            component="p"
                            variant="body1"
                            sx={{
                                maxWidth: "clamp(30em, 40em, 50em)"
                            }}
                        >
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
                        spacing={2}
                        sx={{
                            alignItems: {
                                xs: "center",
                                sm: "right"
                            },

                            padding: 1,

                            order: {
                                xs: -1,
                                sm: 0
                            }
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
