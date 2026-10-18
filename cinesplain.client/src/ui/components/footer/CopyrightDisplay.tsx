import { styled, Typography } from "@mui/material";

const StyledTypography = styled(Typography)`
    user-select: none;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

interface CopyrightDisplayProps {
    startYear: number;
    endYear: number;
    onLogoClick?: () => void;
}

const CopyrightDisplay: React.FC<CopyrightDisplayProps> = ({ startYear, endYear, onLogoClick }) => (
    <StyledTypography variant="overline" onClick={onLogoClick}>
        {`© ${startYear}-${endYear}`}
    </StyledTypography>
);

export default CopyrightDisplay;
