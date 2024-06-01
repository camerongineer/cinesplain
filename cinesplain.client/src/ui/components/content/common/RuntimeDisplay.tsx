import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { getFormattedRuntime } from "../../../../utils/formatUtils";

interface RuntimeDisplayProps {
    runtime: number;
    includeLabel?: boolean;
    sx?: SxProps<Theme>;
}

const RuntimeDisplay: React.FC<RuntimeDisplayProps> = ({ runtime, includeLabel, sx }) => (
    <Typography variant="body1" sx={sx}>
        {includeLabel && <b>Runtime:&nbsp;</b>}
        {runtime > 0 ? getFormattedRuntime(runtime) : "Unknown"}
    </Typography>
);

export default RuntimeDisplay;
