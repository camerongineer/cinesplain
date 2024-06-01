import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils";

interface ReleaseDateDisplayProps {
    releaseDate: string;
    includeLabel?: boolean;
    sx?: SxProps<Theme>;
}

const ReleaseDateDisplay: React.FC<ReleaseDateDisplayProps> = ({ releaseDate, includeLabel, sx }) => {
    const releaseLabelText = new Date() > new Date(releaseDate) ? "Released on" : "Releases on";
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
