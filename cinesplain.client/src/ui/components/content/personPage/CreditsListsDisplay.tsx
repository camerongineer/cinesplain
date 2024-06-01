import { Stack, styled } from "@mui/material";
import CastMember from "../../../../types/castMember.ts";
import CrewMember from "../../../../types/crewMember.ts";
import CastCreditsList from "./CastCreditsList.tsx";
import CrewCreditsList from "./CrewCreditsList.tsx";

const StyledStack = styled(Stack)`
    width: 100%;
`;

interface CreditsListsDisplayProps {
    movieCastCredits: CastMember[];
    movieCrewCredits: CrewMember[];
    showCrewFirst: boolean;
}

const CreditsListsDisplay: React.FC<CreditsListsDisplayProps> = ({
    movieCastCredits,
    movieCrewCredits,
    showCrewFirst
}) => (
    <>
        <StyledStack order={showCrewFirst ? 1 : 0}>
            {!!movieCastCredits.length && (
                <CastCreditsList castCredits={movieCastCredits} truncatedCreditsSize={showCrewFirst ? 5 : 8} />
            )}
        </StyledStack>
        <StyledStack>
            {!!movieCrewCredits.length && (
                <CrewCreditsList crewCredits={movieCrewCredits} truncatedCreditsSize={showCrewFirst ? 8 : 5} />
            )}
        </StyledStack>
    </>
);

export default CreditsListsDisplay;
