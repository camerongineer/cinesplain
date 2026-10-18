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
import { useSearchParams } from "react-router-dom";
import { toggleParams } from "../../../../utils/urlUtils.ts";
import CollapsibleTableFooter from "./CollapsibleTableFooter.tsx";

interface CollapsibleTableProps extends TableContainerProps {
    label?: string;
    tableHeaderRow: ReactNode;
    truncatedAmount: number;
    paramKey: string;
    elements: Iterable<ReactNode> | null;
}

const CollapsibleTable: React.FC<CollapsibleTableProps> = (props) => {
    const { label, tableHeaderRow, elements, truncatedAmount, paramKey, ...rest } = props;
    const [searchParams, setSearchParams] = useSearchParams();

    const handleExpand = () =>
        setSearchParams(toggleParams(searchParams, paramKey), {
            replace: true,
            preventScrollReset: true
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
                                    style={{ userSelect: "none" }}
                                    sx={{
                                        fontSize: "large",
                                        fontWeight: "bold"
                                    }}
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
                                <CollapsibleTableFooter
                                    onClick={handleExpand}
                                    expanded={isExpanded}
                                />
                            )}
                        </TableBody>
                    </Table>
                </Collapse>
            )}
        </TableContainer>
    );
};

export default CollapsibleTable;
