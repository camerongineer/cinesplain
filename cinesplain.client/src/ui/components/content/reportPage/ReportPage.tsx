import { Box, styled } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { authQuery } from "../../../../queries/auth.ts";
import UserInfo from "../../../../types/userInfo.ts";
import LoginPage from "../loginPage/LoginPage.tsx";
import ReportForm from "./ReportForm.tsx";

const StyledBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    gap: 1em;
`;

const ReportPage: React.FC = () => {
    const { data: userInfo } = useQuery(authQuery);

    return userInfo ? (
        <StyledBox>
            <ReportForm userInfo={userInfo} />
        </StyledBox>
    ) : (
        <LoginPage />
    );
};

export default ReportPage;
