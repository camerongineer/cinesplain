import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, TableCell, TableRow, styled } from "@mui/material";

const StyledTableRow = styled(TableRow)`
    & td,
    & th {
        border: 0;
    }
`;

interface TableCollapseFooterProps {
    onClick: () => void;
    expanded: boolean;
}

const CollapsibleTableFooter: React.FC<TableCollapseFooterProps> = ({ onClick, expanded }) => (
    <StyledTableRow>
        <TableCell colSpan={10} align="center">
            <Button
                onClick={onClick}
                startIcon={expanded ? <ArrowDropUp /> : <ArrowDropDown />}
                color="inherit"
                fullWidth
                size="small"
            >
                Show&nbsp;{expanded ? "Less" : "All"}
            </Button>
        </TableCell>
    </StyledTableRow>
);

export default CollapsibleTableFooter;
