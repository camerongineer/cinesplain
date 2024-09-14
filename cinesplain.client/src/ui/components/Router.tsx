import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { homePageLoader } from "../../loaders/homePageLoader.ts";
import { moviePageLoader } from "../../loaders/moviePageLoader.ts";
import { personPageLoader } from "../../loaders/personPageLoader.ts";
import Layout from "./Layout";
import Loading from "./common/Loading";
import NotFound from "./common/NotFound.tsx";
import { headerLoader } from "./header/Header";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 3600
        }
    }
});

const router = createBrowserRouter([
    {
        id: "root",
        element: <Layout />,
        errorElement: <NotFound />,
        loader: headerLoader(queryClient),
        children: [
            {
                index: true,
                async lazy() {
                    const HomePage = lazy(() => import("./content/homePage/HomePage"));
                    return { Component: HomePage };
                },
                loader: homePageLoader(queryClient)
            },
            {
                path: "movies/:movieId",
                async lazy() {
                    const MoviePage = lazy(() => import("./content/moviePage/MoviePage"));
                    return { Component: MoviePage };
                },
                loader: moviePageLoader(queryClient)
            },
            {
                path: "person/:personId",
                async lazy() {
                    const PersonPage = lazy(() => import("./content/personPage/PersonPage"));
                    return { Component: PersonPage };
                },
                loader: personPageLoader(queryClient)
            }
        ]
    }
]);

const Router: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
    </QueryClientProvider>
);

export default Router;
