import RottenTomatoes from "@assets/rottentomatoes_logo.svg?react";
import { Stack, Typography } from "@mui/material";

interface RottenTomatoesDisplayProps {
    rottenTomatoesScore: number;
}

const RottenTomatoesDisplay: React.FC<RottenTomatoesDisplayProps> = ({ rottenTomatoesScore }) => (
    <Stack
        direction="row"
        spacing={0.5}
        sx={{
            alignItems: "center"
        }}
    >
        <RottenTomatoes width={20} />
        <Typography
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Score:
        </Typography>
        <Typography
            variant="h6"
            sx={{
                display: "inline"
            }}
        >
            {rottenTomatoesScore}%
        </Typography>
    </Stack>
);

export default RottenTomatoesDisplay;
