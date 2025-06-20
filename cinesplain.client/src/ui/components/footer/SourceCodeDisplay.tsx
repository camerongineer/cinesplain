import { Stack, styled, Typography } from "@mui/material";
import GithubLink from "./GithubLink.tsx";

const StyledStack = styled(Stack)`
    align-items: center;
    justify-content: center;
    margin: 0.5em 1em;
`;

const SourceCodeDisplay = () => (
    <StyledStack>
        <Typography variant="overline" style={{ userSelect: "none" }}>
            Source Code
        </Typography>
        <GithubLink link="https://github.com/camerongineer/cinesplain" title="cinesplain" />
    </StyledStack>
);

export default SourceCodeDisplay;
