import { TableCell, TableRow, Typography } from "@mui/material";
import listDisplayMovieCastCredit from "../../../../types/listDisplayMovieCastCredit.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import MovieCastCreditsListRow from "./MovieCastCreditsListRow.tsx";

interface MovieCastCreditsListProps {
    castCredits: listDisplayMovieCastCredit[];
    truncatedCreditsSize?: number;
}

const MovieCastCreditsList: React.FC<MovieCastCreditsListProps> = ({ castCredits, truncatedCreditsSize = 5 }) => {
    return (
        <CollapsibleTable
            truncatedAmount={truncatedCreditsSize}
            paramKey="cst-exp"
            tableHeaderRow={
                <TableRow sx={{ "& td, & th": { border: 0 } }}>
                    <TableCell align="center">
                        <Typography variant="overline" fontSize="large">
                            Cast
                        </Typography>
                    </TableCell>
                </TableRow>
            }
            elements={
                !!castCredits.length
                    ? castCredits.map((castCredit) => (
                          <MovieCastCreditsListRow key={castCredit.creditId} castCredit={castCredit} />
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

export default MovieCastCreditsList;
