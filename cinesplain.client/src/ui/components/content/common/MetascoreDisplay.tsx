import Metacritic from "@assets/metacritic_logo.svg?react";
import { Stack, Typography } from "@mui/material";

interface MetascoreDisplayProps {
    metaScore: number;
}

const MetascoreDisplay: React.FC<MetascoreDisplayProps> = ({ metaScore }) => (
    <Stack
        direction="row"
        spacing={0.5}
        sx={{
            alignItems: "center"
        }}
    >
        <Metacritic width={18} />
        <Typography
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Metascore:
        </Typography>
        <Typography
            variant="h6"
            sx={{
                display: "inline"
            }}
        >
            {metaScore}
        </Typography>
    </Stack>
);

export default MetascoreDisplay;
