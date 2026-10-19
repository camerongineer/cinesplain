import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext } from "@tanstack/react-router";
import { HeadContent, Outlet, Scripts, useRouterState } from "@tanstack/react-router";
import { CssBaseline, Stack, ThemeProvider, styled, useTheme } from "@mui/material";
import { Suspense, useEffect, useState, type ReactNode } from "react";
import { headerQuery } from "../queries/header";
import Footer from "../ui/components/footer/Footer.tsx";
import Header from "../ui/components/header/Header";
import NotFound from "../ui/components/common/NotFound.tsx";
import defaultTheme from "../ui/themes/defaultTheme";
import "../ui/styles/index.css";

const StyledContainer = styled(Stack)`
    min-height: 100vh;
    align-items: center;
`;

const StyledStack = styled(Stack)`
    max-width: ${(props) => props.theme.breakpoints.values.xl}px;
    width: 100%;
`;

const AppStack = styled(Stack)`
    min-width: 280px;
`;

const Providers = ({ children }: { children: ReactNode }) => {
    // A per-request emotion cache keeps SSR-emitted critical styles isolated.
    const cache = createCache({ key: "css" });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                <AppStack className="full">{children}</AppStack>
            </ThemeProvider>
        </CacheProvider>
    );
};

const ShellAroundOutlet = () => {    const [degrees, setDegrees] = useState(100);
    const theme = useTheme();
    const isPending = useRouterState({ select: (state) => state.status === "pending" });

    useEffect(() => {
        if (isPending) {
            const intervalId = setInterval(() => {
                setDegrees((prevDegrees) => (prevDegrees + 1) % 360);
            }, 15);

            return () => clearInterval(intervalId);
        }
    }, [isPending]);

    const getLoadingStyle = () => {
        return {
            background: isPending
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
            <StyledStack>
                <Suspense>
                    <Outlet />
                </Suspense>
            </StyledStack>
            <Footer />
        </StyledContainer>
    );
};

const RootDocument = () => {
    return (
        <html lang="en">
            <head>
                <HeadContent />
            </head>
            <body>
                <Providers>
                    <ShellAroundOutlet />
                </Providers>
                <Scripts />
            </body>
        </html>
    );
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8"
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1.0"
            },
            {
                title: "CineSplain - The Movie Info App"
            }
        ]
    }),
    loader: ({ context }) => context.queryClient.ensureQueryData(headerQuery),
    component: RootDocument,
    notFoundComponent: NotFound,
    errorComponent: NotFound
});
