import { Box, styled } from "@mui/material";
import { useLoaderData } from "react-router-dom";
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
    const userInfo = useLoaderData() as UserInfo;

    return <StyledBox>{userInfo ? <ReportForm userInfo={userInfo} /> : <LoginPage />}</StyledBox>;
};

export default ReportPage;
