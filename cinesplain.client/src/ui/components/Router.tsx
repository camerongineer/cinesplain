import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import Loading from "./common/Loading";
import NotFound from "./common/NotFound.tsx";
import HomePage, { homePageLoader } from "./content/homePage/HomePage";
import MoviePage, { moviePageLoader } from "./content/moviePage/MoviePage";
import PersonPage, { personPageLoader } from "./content/personPage/PersonPage.tsx";
import { headerLoader } from "./header/Header";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 3600
        }
    }
});

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route id="root" element={<Layout />} errorElement={<NotFound />} loader={headerLoader(queryClient)}>
            <Route index element={<HomePage />} loader={homePageLoader(queryClient)} />
            <Route path="movies/:movieId" element={<MoviePage />} loader={moviePageLoader(queryClient)} />
            <Route path="person/:personId" element={<PersonPage />} loader={personPageLoader(queryClient)} />
        </Route>
    )
);

const Router: React.FC = () => (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} fallbackElement={<Loading />} />
    </QueryClientProvider>
);

export default Router;
