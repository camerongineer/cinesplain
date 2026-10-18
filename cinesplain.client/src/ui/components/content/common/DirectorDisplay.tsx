import { Stack, Typography } from "@mui/material";

interface DirectorDisplayProps {
    director: string;
}

const DirectorDisplay: React.FC<DirectorDisplayProps> = ({ director }) => (
    <Stack>
        <Typography
            variant="overline"
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Director
        </Typography>
        <Typography
            sx={{
                display: "inline"
            }}
        >
            {director}
        </Typography>
    </Stack>
);

export default DirectorDisplay;
