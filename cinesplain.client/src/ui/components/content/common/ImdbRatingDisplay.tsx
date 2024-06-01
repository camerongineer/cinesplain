import IMDB from "@assets/imdb_logo.svg?react";
import { Stack, Typography } from "@mui/material";

interface ImdbRatingDisplayProps {
    imdbRating: number;
}

const ImdbRatingDisplay: React.FC<ImdbRatingDisplayProps> = ({ imdbRating }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <IMDB height={15} />
        <Typography display="inline" fontWeight="bold">
            Rating:
        </Typography>
        <Typography display="inline" variant="h6">
            {imdbRating}
        </Typography>
    </Stack>
);

export default ImdbRatingDisplay;
