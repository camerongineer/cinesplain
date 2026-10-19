import Github from "@assets/github_logo.svg";
import Microsoft from "@assets/microsoft_logo.svg";
import Signout from "@assets/signout.svg";
import { LoadingButton } from "@mui/lab";
import { Box, IconButton, InputAdornment, Paper, Stack, styled, TextField, Typography, useTheme } from "@mui/material";
import { useLocation, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { reportIssue } from "../../../../routes/report.tsx";
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
    const { pathname } = useLocation();
    const provider = userInfo?.identityDetails;
    const theme = useTheme();
    const report = useServerFn(reportIssue);
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const disabled = false;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitting(true);
        try {
            await report({ data: formData });
            await router.navigate({ to: "/" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <StyledStack>
            <Typography variant="overline" fontWeight="bold" fontSize="large">
                Please report any bugs or issues below
            </Typography>
            <Stack direction="row" alignItems="center">
                <Typography variant="overline">
                    Signed in as <strong>{userInfo.userDetails}</strong>
                </Typography>
                <Box component="a" href={`/.auth/logout?post_logout_redirect_uri=${pathname}`}>
                    <IconButton aria-label="Sign out" size="small" style={{ marginLeft: 2 }}>
                        <Box component="img" src={Signout} width="fit-content" />
                    </IconButton>
                </Box>
            </Stack>
            <form onSubmit={handleSubmit}>
                <Stack minWidth={theme.breakpoints.values.sm} spacing={3}>
                    <TextField
                        type="text"
                        name="username"
                        label="Username"
                        required
                        InputProps={{
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
                        }}
                        value={userInfo.userDetails}
                    />
                    <TextField type="text" name="title" label="Title" required />
                    <TextField type="text" name="issue" label="Issue" multiline required fullWidth minRows={8} />
                    <LoadingButton type="submit" disabled={disabled} loading={submitting}>
                        <span>Send</span>
                    </LoadingButton>
                </Stack>
            </form>
        </StyledStack>
    );
};

export default ReportForm;
