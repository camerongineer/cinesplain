import Github from "@assets/github_logo.svg";
import Microsoft from "@assets/microsoft_logo.svg";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Stack, styled, TextField, Typography, useTheme } from "@mui/material";
import { useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { joinCineSplain } from "../../../../routes/join.tsx";
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

const JoinForm = ({ userInfo }: { userInfo: UserInfo | null }) => {
    const provider = userInfo?.identityProvider;
    const theme = useTheme();
    const join = useServerFn(joinCineSplain);
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);

    const disabled = false;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSubmitting(true);
        try {
            await join({ data: formData });
            await router.navigate({ to: "/" });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <StyledStack>
            <Typography
                variant="overline"
                sx={{
                    fontWeight: "bold",
                    fontSize: "large"
                }}
            >
                Please enter your details below
            </Typography>
            {userInfo && (
                <Box component="img" src={provider === "aad" ? Microsoft : Github} alt={`${provider} Logo`} />
            )}
            <form onSubmit={handleSubmit}>
                <Stack
                    spacing={3}
                    sx={{
                        minWidth: theme.breakpoints.values.sm
                    }}
                >
                    <TextField type="text" name="userName" label="Username" required />
                    <TextField type="text" name="firstName" label="First Name" required />
                    <TextField type="text" name="lastName" label="Last Name" required />
                    <TextField type="text" name="email" label="Email" required />
                    <LoadingButton type="submit" disabled={disabled} loading={submitting}>
                        <span>Send</span>
                    </LoadingButton>
                </Stack>
            </form>
        </StyledStack>
    );
};

export default JoinForm;
