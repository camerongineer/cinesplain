import { Stack, Typography } from "@mui/material";

interface AwardsDisplayProps {
    awards: string;
}

const AccoladesDisplay: React.FC<AwardsDisplayProps> = ({ awards }) => (
    <Stack>
        <Typography display="inline" variant="overline" fontWeight="bold">
            Accolades
        </Typography>
        <Typography display="inline">{awards}</Typography>
    </Stack>
);

export default AccoladesDisplay;
