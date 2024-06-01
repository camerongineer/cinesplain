import { CssBaseline, Stack, styled, ThemeProvider } from "@mui/material";
import defaultTheme from "../themes/defaultTheme";
import Router from "./Router";

const StyledStack = styled(Stack)`
    min-width: 280px;
`;

const App: React.FC = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <StyledStack className="full">
                <Router />
            </StyledStack>
        </ThemeProvider>
    );
};

export default App;
