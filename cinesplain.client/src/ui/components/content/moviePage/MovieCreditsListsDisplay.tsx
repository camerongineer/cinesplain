import { Stack } from "@mui/material";
import { useSuspenseQuery } from "@tanstack/react-query";
import { movieCreditsQuery } from "../../../../queries/moviePage";
import MovieCastCreditsList from "./MovieCastCreditsList.tsx";
import MovieCrewCreditsList from "./MovieCrewCreditsList.tsx";

interface MovieCreditsListsDisplayProps {
    movieId: number;
}

const MovieCreditsListsDisplay: React.FC<MovieCreditsListsDisplayProps> = ({ movieId }) => {
    const { data: credits } = useSuspenseQuery(movieCreditsQuery(movieId));

    return (
        <Stack
            direction={{ sm: "row" }}
            sx={{
                width: "100%",
                justifyContent: "space-evenly",

                alignItems: {
                    xs: "center",
                    sm: "start"
                },

                gap: 3
            }}
        >
            {!!credits?.cast?.length && <MovieCastCreditsList castCredits={credits.cast} />}
            {!!credits?.crew?.length && <MovieCrewCreditsList crewCredits={credits.crew} />}
        </Stack>
    );
};

export default MovieCreditsListsDisplay;
