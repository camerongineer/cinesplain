import { Stack } from "@mui/material";
import Credits from "../../../../types/credits.ts";
import MovieCastCreditsList from "./MovieCastCreditsList.tsx";
import MovieCrewCreditsList from "./MovieCrewCreditsList.tsx";

interface MovieCreditsListsDisplayProps {
    credits: Credits | null;
}

const MovieCreditsListsDisplay: React.FC<MovieCreditsListsDisplayProps> = ({ credits }) => (
    <Stack
        direction={{ sm: "row" }}
        width="100%"
        justifyContent="space-evenly"
        alignItems={{
            xs: "center",
            sm: "start"
        }}
        gap={3}
    >
        {!!credits?.cast?.length && <MovieCastCreditsList castCredits={credits.cast} />}
        {!!credits?.crew?.length && <MovieCrewCreditsList crewCredits={credits.crew} />}
    </Stack>
);

export default MovieCreditsListsDisplay;
