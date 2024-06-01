import Metacritic from "@assets/metacritic_logo.svg?react";
import { Stack, Typography } from "@mui/material";

interface MetascoreDisplayProps {
    metaScore: number;
}

const MetascoreDisplay: React.FC<MetascoreDisplayProps> = ({ metaScore }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <Metacritic width={18} />
        <Typography display="inline" fontWeight="bold">
            Metascore:
        </Typography>
        <Typography display="inline" variant="h6">
            {metaScore}
        </Typography>
    </Stack>
);

export default MetascoreDisplay;
