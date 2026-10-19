import Github from "@assets/github_logo.svg?react";
import Microsoft from "@assets/microsoft_logo.svg?react";
import { Box, Button, Paper, styled, Typography } from "@mui/material";
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

export default LoginPage;
