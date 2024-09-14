import { Logout } from "@mui/icons-material";
import { Button, IconButton, Stack, styled, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import CineSplainUser from "../../../types/cineSplainUser.ts";

const StyledLoggedInDisplay = styled(Stack)`
    flex-direction: row;
    align-items: center;
    gap: 0.25em;
`;

const AccountButton = () => {
    const queryClient = useQueryClient();
    const { data: user, isLoading, isLoadingError } = useQuery<CineSplainUser>({ queryKey: ["user"] })
    const location = useLocation();

    const handleLogout = async () => {
        await axios.post("/api/user/logout");
        await queryClient.setQueryData(["user"], () => null);
    };

    return (
        <>
        {!isLoading && <Stack alignItems="end" mr={1}>
            {user ? (
                <StyledLoggedInDisplay>
                    <Typography variant="overline" color="text.primary" style={{ userSelect: "none" }}>
                        Logged in as {user.firstName}
                    </Typography>
                    <IconButton onClick={handleLogout}>
                        <Logout />
                    </IconButton>
                </StyledLoggedInDisplay>
            ) : (
                <Link to={"/login" + (!location.pathname.match(/^\/login/i) ? `?redirect=${location.pathname}` : "")}>
                    <Button variant="contained">Log In</Button>
                </Link>
            )}
        </Stack>}
        </>
    );
};

export default AccountButton;
