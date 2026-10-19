import { Stack, Typography } from "@mui/material";
import { getCSRatingColor } from "../../../../utils/ratingUtils.ts";
import CSLogoText from "../../common/CSLogoText.tsx";
import CSPopcorn from "../../common/CSPopcorn.tsx";

interface CSRatingDisplayProps {
    voteAverage: number;
}

const CSRatingDisplay: React.FC<CSRatingDisplayProps> = ({ voteAverage }) => (
    <Stack
        direction="row"
        spacing={0.5}
        sx={{
            alignItems: "center"
        }}
    >
        <CSLogoText height={15} />
        <CSPopcorn width={"20px"} color={getCSRatingColor(voteAverage)} />
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
            {voteAverage}
        </Typography>
    </Stack>
);

export default CSRatingDisplay;
