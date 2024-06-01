import { Stack, styled, Typography } from "@mui/material";
import GithubLink from "./GithubLink.tsx";

const StyledStack = styled(Stack)`
    align-items: center;
    justify-content: center;
    margin: 0.5em 1em;
`;

const SourceCodeDisplay: React.FC = () => (
    <StyledStack>
        <Typography variant="overline" style={{ userSelect: "none" }}>
            Source Code
        </Typography>
        <GithubLink link="https://github.com/camerongineer/cinesplain-react" title="cinesplain-react" />
        <GithubLink link="https://github.com/camerongineer/cinesplain-api-dotnet" title="cinesplain-api-dotnet" />
    </StyledStack>
);

export default SourceCodeDisplay;
