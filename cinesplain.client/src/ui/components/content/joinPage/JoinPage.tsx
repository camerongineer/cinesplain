import { Box, styled } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import UserInfo from "../../../../types/userInfo.ts";
import JoinForm from "./JoinForm.tsx";

const StyledBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    gap: 1em;
`;

const JoinPage: React.FC = () => {
    const userInfo = useLoaderData() as UserInfo;

    return (
        <StyledBox>
            <JoinForm userInfo={userInfo} />
        </StyledBox>
    );
};

export default JoinPage;
