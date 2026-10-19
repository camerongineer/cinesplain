import {
    Collapse,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableContainerProps,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import { ReactNode } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { toggleParams } from "../../../../utils/urlUtils.ts";
import CollapsibleTableFooter from "./CollapsibleTableFooter.tsx";

interface CollapsibleTableProps extends TableContainerProps {
    label?: String;
    tableHeaderRow: ReactNode;
    truncatedAmount: number;
    paramKey: string;
    elements: Iterable<ReactNode> | null;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = (props) => {
    const { label, tableHeaderRow, elements, truncatedAmount, paramKey, ...rest } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const handleExpand = () =>
        navigate({
            search: (prev: Record<string, string | undefined> | undefined) => toggleParams(prev, paramKey),
            replace: true
        });

    const isExpanded = !!searchParams.get(paramKey);

    const allElements = elements ? [...elements] : [];
    const persistentElements = allElements.slice(0, truncatedAmount);
    const collapsedElements = allElements.slice(truncatedAmount);

    return (
        <TableContainer {...rest}>
            <Table size="small">
                <TableHead>
                    {label && (
                        <TableRow sx={{ "& td, & th": { border: 0 } }}>
                            <TableCell colSpan={2} align="right">
                                <Typography
                                    variant="overline"
                                    fontSize="large"
                                    fontWeight="bold"
                                    style={{ userSelect: "none" }}
                                >
                                    {label}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    )}
                    {tableHeaderRow}
                </TableHead>
                <TableBody>
                    {persistentElements}
                    {!!collapsedElements.length && !isExpanded && (
                        <CollapsibleTableFooter onClick={handleExpand} expanded={isExpanded} />
                    )}
                </TableBody>
            </Table>
            {!!collapsedElements.length && (
                <Collapse in={isExpanded}>
                    <Table size="small">
                        <TableBody>
                            {collapsedElements}
                            {collapsedElements && (
                                <CollapsibleTableFooter onClick={handleExpand} expanded={isExpanded} />
                            )}
                        </TableBody>
                    </Table>
                </Collapse>
            )}
        </TableContainer>
    );
};

export default CollapsibleTable;
