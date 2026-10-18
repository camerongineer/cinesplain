import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";

interface ReleaseDateDisplayProps {
    releaseDate: string;
    includeLabel?: boolean;
    sx?: SxProps<Theme>;
}

/* Computed once per app session so the label logic stays pure during render */
const today = new Date();

const ReleaseDateDisplay: React.FC<ReleaseDateDisplayProps> = ({
    releaseDate,
    includeLabel,
    sx
}) => {
    const releaseLabelText = today > new Date(releaseDate) ? "Released on" : "Releases on";
    return (
        <>
            <Typography variant="body1" sx={sx}>
                {includeLabel ? <b>{releaseLabelText}:&nbsp;</b> : ""}
                {getFormattedDisplayedDate(releaseDate)}
            </Typography>
        </>
    );
};

export default ReleaseDateDisplay;
