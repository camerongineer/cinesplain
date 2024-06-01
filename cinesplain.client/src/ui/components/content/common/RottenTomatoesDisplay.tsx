import RottenTomatoes from "@assets/rottentomatoes_logo.svg?react";
import { Stack, Typography } from "@mui/material";

interface RottenTomatoesDisplayProps {
    rottenTomatoesScore: number;
}

const RottenTomatoesDisplay: React.FC<RottenTomatoesDisplayProps> = ({ rottenTomatoesScore }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <RottenTomatoes width={20} />
        <Typography display="inline" fontWeight="bold">
            Score:
        </Typography>
        <Typography display="inline" variant="h6">
            {rottenTomatoesScore}%
        </Typography>
    </Stack>
);

export default RottenTomatoesDisplay;
