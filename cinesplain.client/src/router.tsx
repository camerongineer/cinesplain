import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
    // A fresh QueryClient must be created per request in SSR environments.
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 3600
            }
        }
    });

    const router = createRouter({
        routeTree,
        // expose the QueryClient to route loaders via router context
        context: { queryClient },
        scrollRestoration: true,
        defaultPreload: "intent"
    });

    setupRouterSsrQueryIntegration({ router, queryClient });

    return router;
}

declare module "@tanstack/react-router" {
    interface Register {
        router: Awaited<ReturnType<typeof getRouter>>;
    }
}
