import { TableCell, TableRow, Typography } from "@mui/material";
import CrewMember from "../../../../types/crewMember.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import CrewCreditsListRow from "./CrewCreditsListRow.tsx";

interface CrewCreditsListProps {
    crewCredits: CrewMember[];
    truncatedCreditsSize?: number;
}

const CrewCreditsList: React.FC<CrewCreditsListProps> = ({ crewCredits, truncatedCreditsSize = 8 }) => {
    return (
        <CollapsibleTable
            label="Crew"
            truncatedAmount={truncatedCreditsSize}
            paramKey="crw-exp"
            tableHeaderRow={
                <TableRow sx={{ "& td, & th": { border: 0 } }}>
                    <TableCell>
                        <Typography variant="overline">Title/Job</Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="overline">Release Date</Typography>
                    </TableCell>
                </TableRow>
            }
            elements={
                crewCredits.length
                    ? crewCredits.map((crewMemberCredit) => (
                          <CrewCreditsListRow key={crewMemberCredit.creditId} crewMemberCredit={crewMemberCredit} />
                      ))
                    : null
            }
            sx={{
                minWidth: 280,
                width: "100%",
                height: "fit-content"
            }}
        />
    );
};

export default CrewCreditsList;
