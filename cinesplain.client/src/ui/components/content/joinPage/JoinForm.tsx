import { LoadingButton } from "@mui/lab";
import { Paper, Stack, styled, TextField, Typography, useTheme } from "@mui/material";
import { Form, useNavigation } from "react-router-dom";

const StyledStack = styled(Paper)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3em;
    gap: 2em;
    background: linear-gradient(
        45deg,
        ${(props) => props.theme.palette.primary.main}35,
        ${(props) => props.theme.palette.primary.main}15,
        ${(props) => props.theme.palette.primary.main}35
    );
`;

const JoinForm = () => {
    const navigation = useNavigation();
    const theme = useTheme();

    const disabled = false;

    return (
        <StyledStack>
            <Typography variant="overline" fontWeight="bold" fontSize="large">
                Please enter your details below
            </Typography>
            <Form method="post">
                <Stack minWidth={theme.breakpoints.values.sm} spacing={3}>
                    <TextField type="text" name="email" label="Email" required />
                    <TextField type="text" name="firstName" label="First Name" required />
                    <TextField type="text" name="lastName" label="Last Name" required />
                    <TextField type="password" name="password" label="Password" required />
                    <TextField type="password" name="confirmPassword" label="Confirm Password" required />
                    <LoadingButton type="submit" disabled={disabled} loading={navigation.state === "submitting"}>
                        <span>Send</span>
                    </LoadingButton>
                </Stack>
            </Form>
        </StyledStack>
    );
};

export default JoinForm;
