import { Box, styled } from "@mui/material";
import { redirect, useLoaderData } from "react-router-dom";
import { retrieveUser } from "../../../../api/usersApi.ts";
import authLoader from "../../../../loaders/authLoader.ts";
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

const joinPageLoader = async (): Promise<UserInfo | null> => {
    const userAuth = await authLoader();
    if (!userAuth) throw redirect("/login");
    let user;
    if (userAuth) {
        try {
            user = await retrieveUser(userAuth.userId);
        } catch (error) {
            return userAuth;
        }
    }
    if (user) window.location.replace("/");
    return null;
};

const JoinPage: React.FC = () => {
    const userInfo = useLoaderData() as UserInfo;

    return (
        <StyledBox>
            <JoinForm userInfo={userInfo} />
        </StyledBox>
    );
};

export { joinPageLoader };
export default JoinPage;
