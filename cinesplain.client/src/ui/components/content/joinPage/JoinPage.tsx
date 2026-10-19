import { Box, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../../../../queries/auth.ts";
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
    const { data: userInfo } = useQuery(authQuery);

    return userInfo ? (
        <StyledBox>
            <JoinForm userInfo={userInfo} />
        </StyledBox>
    ) : null;
};

export default JoinPage;
