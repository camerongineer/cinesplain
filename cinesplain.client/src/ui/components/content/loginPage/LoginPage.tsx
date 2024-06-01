import Github from "@assets/github.svg?react";
import Microsoft from "@assets/microsoft.svg?react";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
import { redirect } from "react-router-dom";
import { retrieveUser } from "../../../../api/usersApi.ts";
import authLoader from "../../../../loaders/authLoader.ts";
import UserInfo from "../../../../types/userInfo.ts";
import CSLoadingIcon from "../../common/CSLoadingIcon.tsx";

const StyledBox = styled(Box)`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    align-items: center;
    gap: 1em;
`;

const StyledPaper = styled(Paper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4em;
    gap: 2em;
    background: linear-gradient(
        45deg,
        ${(props) => props.theme.palette.primary.main}35,
        ${(props) => props.theme.palette.primary.main}15,
        ${(props) => props.theme.palette.primary.main}35
    );
`;

const loginPageLoader = async (): Promise<UserInfo | null> => {
    const userAuth = await authLoader();
    let user;
    if (userAuth) {
        try {
            user = await retrieveUser(userAuth.userId);
        } catch (error) {
            user = null;
        }
    }
    if (userAuth && !user) throw redirect("/join");
    if (user) throw redirect("/");
    return null;
};

const LoginPage = () => {
    return (
        <StyledBox>
            <StyledPaper>
                <CSLoadingIcon height={150} />
                <Typography variant="overline" fontWeight="bold" fontSize="large" pb={4}>
                    Please sign in
                </Typography>
                <Box component="a" href={`/.auth/login/aad?post_login_redirect_uri=/login`}>
                    <Button variant="contained" startIcon={<Microsoft />}>
                        Log in with Microsoft
                    </Button>
                </Box>
                <Box component="a" href={`/.auth/login/github?post_login_redirect_uri=/login`}>
                    <Button variant="contained" startIcon={<Github />}>
                        Log in with Github
                    </Button>
                </Box>
            </StyledPaper>
        </StyledBox>
    );
};

export { loginPageLoader };
export default LoginPage;
