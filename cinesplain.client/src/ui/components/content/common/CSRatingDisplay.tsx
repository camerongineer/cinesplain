import { Stack, Typography } from "@mui/material";
import { getCSRatingColor } from "../../../../utils/ratingUtils.ts";
import CSLogoText from "../../common/CSLogoText.tsx";
import CSPopcorn from "../../common/CSPopcorn.tsx";

interface CSRatingDisplayProps {
    voteAverage: number;
}

const CSRatingDisplay: React.FC<CSRatingDisplayProps> = ({ voteAverage }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <CSLogoText height={15} />
        <CSPopcorn width={"20px"} color={getCSRatingColor(voteAverage)} />
        <Typography display="inline" fontWeight="bold">
            Rating:
        </Typography>
        <Typography display="inline" variant="h6">
            {voteAverage}
        </Typography>
    </Stack>
);

export default CSRatingDisplay;
