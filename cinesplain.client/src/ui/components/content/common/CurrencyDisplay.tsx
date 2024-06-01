import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { getFormattedCurrencyAmount } from "../../../../utils/formatUtils";

interface CurrencyDisplayProps {
    labelText: string;
    currencyAmount: number;
    sx?: SxProps<Theme>;
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ labelText, currencyAmount, sx }) => (
    <>
        <Typography variant="body1" sx={sx}>
            <b>{labelText}:</b>&nbsp;{currencyAmount > 0 ? getFormattedCurrencyAmount(currencyAmount) : "Unknown"}
        </Typography>
    </>
);

export default CurrencyDisplay;
