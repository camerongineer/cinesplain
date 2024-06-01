import Mui from "@assets/mui_logo.svg?react";
import ReactJs from "@assets/react_logo.svg?react";
import ReactQuery from "@assets/react_query_logo.svg?react";
import ReactRouter from "@assets/react_router_logo.svg?react";
import Typescript from "@assets/typescript_logo.svg?react";
import { Stack, styled } from "@mui/material";

const StyledStack = styled(Stack)`
    flex-direction: row;
    justify-content: center;
    gap: 1em;
`;

const LibraryIconDisplay: React.FC = () => (
    <StyledStack>
        <ReactJs />
        <Typescript />
        <Mui />
        <ReactQuery />
        <ReactRouter />
    </StyledStack>
);

export default LibraryIconDisplay;
