import { TableCell, TableRow, Typography } from "@mui/material";
import CastMember from "../../../../types/castMember.ts";
import CollapsibleTable from "../common/CollapsibleTable.tsx";
import CastCreditsListRow from "./CastCreditsListRow.tsx";

interface CrewCreditsListProps {
    castCredits: CastMember[];
    truncatedCreditsSize?: number;
}

const CastCreditsList: React.FC<CrewCreditsListProps> = ({ castCredits, truncatedCreditsSize = 8 }) => {
    return (
        <CollapsibleTable
            label="Cast"
            truncatedAmount={truncatedCreditsSize}
            paramKey="cst-exp"
            tableHeaderRow={
                <TableRow sx={{ "& td, & th": { border: 0 } }}>
                    <TableCell>
                        <Typography variant="overline">Title/Role</Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography variant="overline">Release Date</Typography>
                    </TableCell>
                </TableRow>
            }
            elements={
                castCredits
                    ? castCredits.map((castMemberCredit) => (
                          <CastCreditsListRow key={castMemberCredit.creditId} castMemberCredit={castMemberCredit} />
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

export default CastCreditsList;
