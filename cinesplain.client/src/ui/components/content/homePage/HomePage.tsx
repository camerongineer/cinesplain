import { Grid, Stack } from "@mui/material";
import { blue, pink, purple, red } from "@mui/material/colors";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {
    getClassicMoviesPath,
    getMostHatedMoviesPath,
    getMostLovedMoviesPath,
    getNowPlayingMoviesPath,
    getUpcomingMoviesPath,
    retrieveMovies
} from "../../../../api/moviesApi.ts";
import Movie from "../../../../types/movie.ts";
import Hero from "./Hero";
import RatingList from "./RatingList";
import RecentMoviesRow from "./RecentMoviesRow";

const homePageQuery = () => ({
    queryKey: ["homePage"],
    queryFn: async () => {
        const recentMovies = await retrieveMovies(getNowPlayingMoviesPath());
        const lovedMovies = await retrieveMovies(getMostLovedMoviesPath());
        const hatedMovies = await retrieveMovies(getMostHatedMoviesPath());
        const classicMovies = await retrieveMovies(getClassicMoviesPath());
        const upcomingMovies = await retrieveMovies(getUpcomingMoviesPath());
        return { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies };
    }
});

const homePageLoader = (queryClient: QueryClient) => async () => {
    return queryClient.getQueryData(homePageQuery().queryKey) ?? (await queryClient.fetchQuery(homePageQuery()));
};

interface LoaderData {
    recentMovies: Movie[];
    lovedMovies: Movie[];
    hatedMovies: Movie[];
    classicMovies: Movie[];
    upcomingMovies: Movie[];
}

const HomePage: React.FC = () => {
    const initialData = useLoaderData() as Awaited<ReturnType<ReturnType<typeof homePageLoader>>>;
    const { data } = useQuery({ ...homePageQuery(), initialData });
    const { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies } = data as LoaderData;

    useEffect(() => {
        document.title = "CineSplain - The Movie Info App";
    }, []);

    return (
        <Stack className="full">
            <Stack
                className="full"
                minHeight={{
                    xs: "calc(100dvh - 70px)",
                    md: "80vh"
                }}
            >
                <RecentMoviesRow movies={recentMovies} />
                <Hero />
            </Stack>
            <Grid container className="full" paddingTop={2} margin={0} spacing={0}>
                <Grid item xs={12} md={4} padding={1}>
                    <RatingList
                        movies={upcomingMovies}
                        backgroundOverlayColor={blue["900"]}
                        backdropInterval={25000}
                        labelText="Upcoming"
                    />
                </Grid>
                <Grid item xs={12} md={8} padding={1}>
                    <RatingList
                        movies={lovedMovies}
                        backgroundOverlayColor={pink["900"]}
                        backdropInterval={27500}
                        labelText="Most Loved"
                    />
                </Grid>
                <Grid item xs={12} md={8} padding={1}>
                    <RatingList
                        movies={hatedMovies}
                        backgroundOverlayColor={red["900"]}
                        backdropInterval={40000}
                        labelText="Most Hated"
                    />
                </Grid>
                <Grid item xs={12} md={4} padding={1}>
                    <RatingList
                        movies={classicMovies}
                        backgroundOverlayColor={purple["900"]}
                        backdropInterval={22000}
                        labelText="Classics"
                    />
                </Grid>
            </Grid>
        </Stack>
    );
};

export { homePageLoader };
export default HomePage;
