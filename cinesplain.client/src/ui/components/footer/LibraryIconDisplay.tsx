import Mui from "@assets/mui_logo.svg?react";
import ReactJs from "@assets/react_logo.svg?react";
import TanStack from "@assets/tanstack_logo.svg?react";
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
        <TanStack />
    </StyledStack>
);

export default LibraryIconDisplay;
