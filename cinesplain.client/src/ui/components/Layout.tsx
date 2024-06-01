import { Stack, styled, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import Footer from "./footer/Footer.tsx";
import Header from "./header/Header";

const StyledContainer = styled(Stack)`
    min-height: 100vh;
    align-items: center;
`;

const StyledStack = styled(Stack)`
    max-width: ${(props) => props.theme.breakpoints.values.xl}px;
    width: 100%;
`;

const Layout: React.FC = () => {
    const [degrees, setDegrees] = useState(100);
    const theme = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        if (navigation.state === "loading") {
            const intervalId = setInterval(() => {
                setDegrees((prevDegrees) => (prevDegrees + 1) % 360);
            }, 15);

            return () => clearInterval(intervalId);
        }
    }, [navigation.state]);

    const getLoadingStyle = () => {
        return {
            background:
                navigation.state === "loading"
                    ? `linear-gradient(${degrees}deg,
                        ${theme.palette.secondary.main}80,
                        ${theme.palette.secondary.main}25,
                        ${theme.palette.secondary.main}80),
                        ${theme.palette.background.default}`
                    : ""
        };
    };
    return (
        <StyledContainer className="full" style={getLoadingStyle()}>
            <Header />
            <ScrollRestoration />
            <StyledStack>
                <Outlet />
            </StyledStack>
            <Footer />
        </StyledContainer>
    );
};

export default Layout;
