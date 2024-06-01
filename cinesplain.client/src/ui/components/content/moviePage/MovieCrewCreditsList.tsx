import { TableCell, TableRow, Typography } from "@mui/material";
import listDisplayMovieCrewCredit from "../../../../types/listDisplayMovieCrewCredit.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import MovieCrewCreditsListRow from "./MovieCrewCreditsListRow.tsx";

interface MovieCrewCreditsListProps {
    crewCredits: listDisplayMovieCrewCredit[];
    truncatedCreditsSize?: number;
}

const MovieCrewCreditsList: React.FC<MovieCrewCreditsListProps> = ({ crewCredits, truncatedCreditsSize = 5 }) => {
    return (
        <CollapsibleTable
            truncatedAmount={truncatedCreditsSize}
            paramKey="crw-exp"
            tableHeaderRow={
                <TableRow sx={{ "& td, & th": { border: 0 } }}>
                    <TableCell align="center">
                        <Typography variant="overline" fontSize="large">
                            Crew
                        </Typography>
                    </TableCell>
                </TableRow>
            }
            elements={
                !!crewCredits.length
                    ? crewCredits.map((crewCredit) => (
                          <MovieCrewCreditsListRow key={crewCredit.creditId} crewCredit={crewCredit} />
                      ))
                    : null
            }
            sx={{
                maxWidth: "clamp(280px, 80%, 360px)",
                height: "fit-content"
            }}
        />
    );
};

export default MovieCrewCreditsList;
