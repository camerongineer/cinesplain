import IMDB from "@assets/imdb_logo.svg?react";
import { Stack, Typography } from "@mui/material";

interface ImdbRatingDisplayProps {
    imdbRating: number;
}

const ImdbRatingDisplay: React.FC<ImdbRatingDisplayProps> = ({ imdbRating }) => (
    <Stack
        direction="row"
        spacing={0.5}
        sx={{
            alignItems: "center"
        }}
    >
        <IMDB height={15} />
        <Typography
            sx={{
                display: "inline",
                fontWeight: "bold"
            }}
        >
            Rating:
        </Typography>
        <Typography
            variant="h6"
            sx={{
                display: "inline"
            }}
        >
            {imdbRating}
        </Typography>
    </Stack>
);

export default ImdbRatingDisplay;
