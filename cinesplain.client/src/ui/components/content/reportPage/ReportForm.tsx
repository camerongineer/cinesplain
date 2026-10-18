import Github from "@assets/github.svg";
import Microsoft from "@assets/microsoft.svg";
import Signout from "@assets/signout.svg";
import { LoadingButton } from "@mui/lab";
import {
    Box,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    styled,
    TextField,
    Typography,
    useTheme
} from "@mui/material";
import { Form, useNavigation } from "react-router-dom";
import UserInfo from "../../../../types/userInfo.ts";

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

interface ReportFormProps {
    userInfo: UserInfo;
}

const ReportForm: React.FC<ReportFormProps> = ({ userInfo }) => {
    const redirect = window.location.pathname;
    const provider = userInfo?.identityDetails;
    const navigation = useNavigation();
    const theme = useTheme();

    const disabled = false;
    return (
        <StyledStack>
            <Typography
                variant="overline"
                sx={{
                    fontWeight: "bold",
                    fontSize: "large"
                }}
            >
                Please report any bugs or issues below
            </Typography>
            <Stack
                direction="row"
                sx={{
                    alignItems: "center"
                }}
            >
                <Typography variant="overline">
                    Signed in as <strong>{userInfo.userDetails}</strong>
                </Typography>
                <Box component="a" href={`/.auth/logout?post_logout_redirect_uri=${redirect}`}>
                    <IconButton aria-label="Sign out" size="small" style={{ marginLeft: 2 }}>
                        <Box
                            component="img"
                            src={Signout}
                            sx={{
                                width: "fit-content"
                            }}
                        />
                    </IconButton>
                </Box>
            </Stack>
            <Form method="post" action={"/report"}>
                <Stack
                    spacing={3}
                    sx={{
                        minWidth: theme.breakpoints.values.sm
                    }}
                >
                    <TextField
                        type="text"
                        name="username"
                        label="Username"
                        required
                        value={userInfo.userDetails}
                        slotProps={{
                            input: {
                                readOnly: true,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box
                                            component="img"
                                            src={provider === "Microsoft" ? Microsoft : Github}
                                            alt={`${provider} Logo`}
                                        />
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <TextField type="text" name="title" label="Title" required />
                    <TextField
                        type="text"
                        name="issue"
                        label="Issue"
                        multiline
                        required
                        fullWidth
                        minRows={8}
                    />
                    <LoadingButton
                        type="submit"
                        disabled={disabled}
                        loading={navigation.state === "submitting"}
                    >
                        <span>Send</span>
                    </LoadingButton>
                </Stack>
            </Form>
        </StyledStack>
    );
};

export default ReportForm;
