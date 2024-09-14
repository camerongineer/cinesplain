import { Box, styled } from "@mui/material";
import JoinForm from "./JoinForm.tsx";

const StyledBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    gap: 1em;
`;

const joinPageLoader = async () => {
    return null;
}

const JoinPage: React.FC = () => {
    return (
        <StyledBox>
            <JoinForm />
        </StyledBox>
    );
};

export { joinPageLoader };
export default JoinPage;
