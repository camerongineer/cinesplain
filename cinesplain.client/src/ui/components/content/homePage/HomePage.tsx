import { Grid, Stack, Box } from "@mui/material";
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

/*
 * Reserved space for a streamed section that matches the final layout so the
 * already-visible content (hero, surrounding sections) never shifts when the
 * content arrives. The skeletons stay deliberately quiet: they are just
 * reserved space, not a loading indicator.
 */
const RecentMoviesSkeleton: React.FC = () => (
    <Box
        sx={{
            flex: 4,
            minHeight: { xs: "300px", md: "360px" }
        }}
    />
);

const RatingListSkeleton: React.FC<{ tint: string }> = ({ tint }) => (
    <Box
        sx={{
            minHeight: { xs: "560px", md: "620px" },
            borderRadius: "10px",
            background: `linear-gradient(${tint}2b, ${tint}1a)`
        }}
    />
);

const RecentMoviesSection: React.FC = () => {
    const { data } = useSuspenseQuery(recentMoviesQuery);
    return <RecentMoviesRow list={data} />;
};

const UpcomingSection: React.FC = () => {
    const { data } = useSuspenseQuery(upcomingMoviesQuery);
    return (
        <RatingList
            movies={data.movies}
            spotlightSeed={data.spotlightSeed}
            backgroundOverlayColor={blue["900"]}
            backdropInterval={25000}
            labelText="Upcoming"
        />
    );
};

const LovedSection: React.FC = () => {
    const { data } = useSuspenseQuery(lovedMoviesQuery);
    return (
        <RatingList
            movies={data.movies}
            spotlightSeed={data.spotlightSeed}
            backgroundOverlayColor={pink["900"]}
            backdropInterval={27500}
            labelText="Most Loved"
        />
    );
};

const HatedSection: React.FC = () => {
    const { data } = useSuspenseQuery(hatedMoviesQuery);
    return (
        <RatingList
            movies={data.movies}
            spotlightSeed={data.spotlightSeed}
            backgroundOverlayColor={red["900"]}
            backdropInterval={40000}
            labelText="Most Hated"
        />
    );
};

const ClassicSection: React.FC = () => {
    const { data } = useSuspenseQuery(classicMoviesQuery);
    return (
        <RatingList
            movies={data.movies}
            spotlightSeed={data.spotlightSeed}
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
                <Suspense fallback={<RecentMoviesSkeleton />}>
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
                    <Suspense fallback={<RatingListSkeleton tint={blue["900"]} />}>
                        <UpcomingSection />
                    </Suspense>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} sx={{ padding: 1 }}>
                    <Suspense fallback={<RatingListSkeleton tint={pink["900"]} />}>
                        <LovedSection />
                    </Suspense>
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} sx={{ padding: 1 }}>
                    <Suspense fallback={<RatingListSkeleton tint={red["900"]} />}>
                        <HatedSection />
                    </Suspense>
                </Grid>
                <Grid size={{ xs: 12, md: 5 }} sx={{ padding: 1 }}>
                    <Suspense fallback={<RatingListSkeleton tint={purple["900"]} />}>
                        <ClassicSection />
                    </Suspense>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default HomePage;
