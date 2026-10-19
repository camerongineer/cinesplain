import MarrLogo from "@assets/marr_logo.svg?react";
import { Stack, styled, Typography } from "@mui/material";

const StyledStack = styled(Stack)`
    align-items: center;
    justify-content: center;
    align-self: center;
    gap: 0.5em;
    padding: 0.5em;
`;

interface CopyrightDisplayProps {
    startYear: number;
    endYear: number;
    onLogoClick?: () => void;
}

const CopyrightDisplay: React.FC<CopyrightDisplayProps> = ({ startYear, endYear, onLogoClick }) => (
    <StyledStack direction={{ sm: "row" }}>
        <Typography
            variant="overline"
            sx={{
                fontSize: "large",
                textAlign: "center",
                userSelect: "none",
                lineHeight: 0,
                mt: { xs: 1, sm: 0 }
            }}
        >
            {`© ${startYear}-${endYear} by`}
        </Typography>
        <MarrLogo height={40} style={{ cursor: "pointer" }} onClick={onLogoClick} />
    </StyledStack>
);

export default CopyrightDisplay;
