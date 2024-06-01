import { Box, styled, Typography } from "@mui/material";
import CSLoadingIcon from "../../common/CSLoadingIcon";

const StyledBox = styled(Box)`
    flex-direction: row;
    padding: 15px 0 6px 0;
    gap: 2px;
`;

interface SplainationDisplayProps {
    overview: string;
}

const SplainationDisplay: React.FC<SplainationDisplayProps> = ({ overview }) => (
    <>
        <StyledBox className="full center">
            <CSLoadingIcon height={30} loadRotationMilliseconds={750} />
            <Typography variant="h6" fontWeight="bold" width="fit-content">
                'Splaination
            </Typography>
        </StyledBox>
        <Typography variant="body1" pb={2}>
            {overview}
        </Typography>
    </>
);

export default SplainationDisplay;
