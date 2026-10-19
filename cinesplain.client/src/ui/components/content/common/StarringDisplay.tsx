import { Stack, Typography } from "@mui/material";

interface StarringDisplayProps {
    stars: string;
}

const StarringDisplay: React.FC<StarringDisplayProps> = ({ stars }) => (
    <Stack>
        <Typography
            variant="overline"
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Starring
        </Typography>
        <Typography
            sx={{
                display: "inline"
            }}
        >
            {stars}
        </Typography>
    </Stack>
);

export default StarringDisplay;
