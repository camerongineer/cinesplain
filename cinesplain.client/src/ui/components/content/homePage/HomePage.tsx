import { Grid, Stack } from "@mui/material";
import { blue, pink, purple, red } from "@mui/material/colors";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import {
    classicMoviesQuery,
    hatedMoviesQuery,
    lovedMoviesQuery,
    recentMoviesQuery,
    upcomingMoviesQuery
} from "../../../../queries/homePage";
import Hero from "./Hero";
import RatingList from "./RatingList";
import RecentMoviesRow from "./RecentMoviesRow";

const RecentMoviesSection: React.FC = () => {
    const { data: recentMovies } = useSuspenseQuery(recentMoviesQuery);
    return <RecentMoviesRow movies={recentMovies} />;
};

const UpcomingSection: React.FC = () => {
    const { data: upcomingMovies } = useSuspenseQuery(upcomingMoviesQuery);
    return (
        <RatingList
            movies={upcomingMovies}
            backgroundOverlayColor={blue["900"]}
            backdropInterval={25000}
            labelText="Upcoming"
        />
    );
};

const LovedSection: React.FC = () => {
    const { data: lovedMovies } = useSuspenseQuery(lovedMoviesQuery);
    return (
        <RatingList
            movies={lovedMovies}
            backgroundOverlayColor={pink["900"]}
            backdropInterval={27500}
            labelText="Most Loved"
        />
    );
};

const HatedSection: React.FC = () => {
    const { data: hatedMovies } = useSuspenseQuery(hatedMoviesQuery);
    return (
        <RatingList
            movies={hatedMovies}
            backgroundOverlayColor={red["900"]}
            backdropInterval={40000}
            labelText="Most Hated"
        />
    );
};

const ClassicSection: React.FC = () => {
    const { data: classicMovies } = useSuspenseQuery(classicMoviesQuery);
    return (
        <RatingList
            movies={classicMovies}
            backgroundOverlayColor={purple["900"]}
            backdropInterval={22000}
            labelText="Classics"
        />
    );
};

const HomePage: React.FC = () => {
    useEffect(() => {
        document.title = "CineSplain - The Movie Info App";
    }, []);

    return (
        <Stack className="full">
            <Stack
                className="full"
                sx={{
                    minHeight: {
                        xs: "calc(100dvh - 70px)",
                        md: "80vh"
                    }
                }}
            >
                <Suspense fallback={null}>
                    <RecentMoviesSection />
                </Suspense>
                <Hero />
            </Stack>
            <Grid
                container
                className="full"
                spacing={0}
                sx={{
                    paddingTop: 2,
                    margin: 0
                }}
            >
                <Grid size={{ xs: 12, md: 5 }} sx={{ padding: 1 }}>
                    <Suspense fallback={null}>
                        <UpcomingSection />
                    </Suspense>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} sx={{ padding: 1 }}>
                    <Suspense fallback={null}>
                        <LovedSection />
                    </Suspense>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} sx={{ padding: 1 }}>
                    <Suspense fallback={null}>
                        <HatedSection />
                    </Suspense>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }} sx={{ padding: 1 }}>
                    <Suspense fallback={null}>
                        <ClassicSection />
                    </Suspense>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default HomePage;
