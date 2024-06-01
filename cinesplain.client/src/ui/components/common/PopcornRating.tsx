import { Box, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import { roundedToTenth } from "../../../utils/formatUtils.ts";
import { getCSRatingColor } from "../../../utils/ratingUtils.ts";
import CSPopcorn from "./CSPopcorn.tsx";

const RatingCircle = styled(Box)`
    display: flex;
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid black;
    right: -10px;
    top: 0;
    color: ${grey[100]};
    font-weight: bolder;
`;

interface CSRatingProps {
    voteAverage: number | null;
    width?: string;
}

const PopcornRating: React.FC<CSRatingProps> = ({ voteAverage, width = "45px" }) => {
    if (!voteAverage) return null;
    const ratingColor = getCSRatingColor(voteAverage);
    return (
        <Box position="relative" width="fit-content">
            <CSPopcorn width={width} color={ratingColor} />
            <RatingCircle className="center" bgcolor={ratingColor}>
                {roundedToTenth(voteAverage)}
            </RatingCircle>
        </Box>
    );
};

export default PopcornRating;
