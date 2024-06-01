import { Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { SxProps } from "@mui/system";

interface TitleDisplayProps {
    title: string;
    sx?: SxProps<Theme>;
}

const TitleDisplay: React.FC<TitleDisplayProps> = ({ title, sx }) => (
    <>
        <Typography variant="h3" sx={sx}>
            {title}
        </Typography>
    </>
);

export default TitleDisplay;
