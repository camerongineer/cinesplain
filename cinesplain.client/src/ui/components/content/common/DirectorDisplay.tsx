import { Stack, Typography } from "@mui/material";

interface DirectorDisplayProps {
    director: string;
}

const DirectorDisplay: React.FC<DirectorDisplayProps> = ({ director }) => (
    <Stack>
        <Typography display="inline" variant="overline" fontWeight="bold">
            Director
        </Typography>
        <Typography display="inline">{director}</Typography>
    </Stack>
);

export default DirectorDisplay;
