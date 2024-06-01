import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

interface TaglineDisplayProps {
    tagline: string;
    sx?: SxProps<Theme>;
}

const TaglineDisplay: React.FC<TaglineDisplayProps> = ({ tagline, sx }) => (
    <>
        <Typography variant="subtitle1" sx={sx}>
            <strong>{tagline}</strong>
        </Typography>
    </>
);

export default TaglineDisplay;
