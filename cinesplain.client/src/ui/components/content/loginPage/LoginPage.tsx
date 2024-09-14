import { LoadingButton } from "@mui/lab";
import { Box, Paper, Stack, styled, TextField, Typography } from "@mui/material";
import { Form, useLocation, useNavigation } from "react-router-dom";
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

const loginPageLoader = async () => {
    return null;
};

const LoginPage = () => {
    const location = useLocation();
    const navigation = useNavigation();

    return (
        <StyledBox>
            <StyledPaper>
                <CSLoadingIcon height={150} />
                <Typography variant="overline" fontWeight="bold" fontSize="large" pb={4}>
                    Please sign in
                </Typography>
                <Form method="post">
                    <Stack minWidth={(theme) => theme.breakpoints.values.sm} spacing={3}>
                        <input type="hidden" name="redirect" value={location.search.replace("?redirect=", "")} />
                        <TextField type="text" name="email" label="Email" required />
                        <TextField type="password" name="password" label="Password" required />
                        <LoadingButton
                            type="submit"
                            disabled={navigation.state === "submitting"}
                            loading={navigation.state === "submitting"}
                        >
                            <span>Send</span>
                        </LoadingButton>
                    </Stack>
                </Form>
            </StyledPaper>
        </StyledBox>
    );
};

export { loginPageLoader };
export default LoginPage;
