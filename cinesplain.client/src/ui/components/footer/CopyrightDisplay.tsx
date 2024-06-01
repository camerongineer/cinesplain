import MarrLogo from "@assets/marr_logo.svg?react";
import { Stack, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const StyledStack = styled(Stack)`
    align-items: center;
    justify-content: center;
    align-self: center;
    gap: 0.5em;
    padding: 0.5em;
`;

const CopyrightDisplay: React.FC = () => (
    <StyledStack direction={{ sm: "row" }}>
        <Typography
            variant="overline"
            textAlign="center"
            fontSize="large"
            style={{ userSelect: "none" }}
            lineHeight={0}
            mt={{
                xs: 1,
                sm: 0
            }}
        >
            © 2023-2024 by
        </Typography>
        <Link to="https://www.linkedin.com/in/c-em/" target="_blank" rel="noopener noreferrer">
            <MarrLogo height={40} />
        </Link>
    </StyledStack>
);

export default CopyrightDisplay;
