import { Logout } from "@mui/icons-material";
import { Button, IconButton, Stack, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CineSplainUser from "../../../types/cineSplainUser.ts";

const StyledLoggedInDisplay = styled(Stack)`
    flex-direction: row;
    align-items: center;
    gap: 0.25em;
`;

const AccountButton = ({ user }: { user: CineSplainUser | null }) => {
    return (
        <Stack alignItems="end" mr={1}>
            {user ? (
                <StyledLoggedInDisplay>
                    <Typography variant="overline" color="text.primary" style={{ userSelect: "none" }}>
                        Logged in as {user.userName}
                    </Typography>
                    <a href={`/.auth/logout`}>
                        <IconButton>
                            <Logout />
                        </IconButton>
                    </a>
                </StyledLoggedInDisplay>
            ) : (
                <Link to="/login">
                    <Button variant="contained">Sign in</Button>
                </Link>
            )}
        </Stack>
    );
};

export default AccountButton;
