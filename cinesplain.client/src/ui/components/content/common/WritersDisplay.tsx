import { Stack, Typography } from "@mui/material";

interface WritersDisplayProps {
    writers: string;
}

const WritersDisplay: React.FC<WritersDisplayProps> = ({ writers }) => (
    <Stack>
        <Typography
            variant="overline"
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Writers
        </Typography>
        <Typography
            sx={{
                display: "inline"
            }}
        >
            {writers}
        </Typography>
    </Stack>
);

export default WritersDisplay;
