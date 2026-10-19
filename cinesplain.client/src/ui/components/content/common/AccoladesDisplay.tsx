import { Stack, Typography } from "@mui/material";

interface AwardsDisplayProps {
    awards: string;
}

const AccoladesDisplay: React.FC<AwardsDisplayProps> = ({ awards }) => (
    <Stack>
        <Typography
            variant="overline"
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Accolades
        </Typography>
        <Typography
            sx={{
                display: "inline"
            }}
        >
            {awards}
        </Typography>
    </Stack>
);

export default AccoladesDisplay;
