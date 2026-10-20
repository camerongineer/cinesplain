import { Grid, Skeleton, Stack, Box } from "@mui/material";
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
 * content arrives. The skeletons mimic the real sections' structure (dark
 * backdrop-style block, label + panel with rows) so nothing appears to be
 * covered or missing while a section streams in.
 */
const RecentMoviesSkeleton: React.FC = () => (
    <Box
        sx={{
            flex: 4,
            width: "100%",
            minHeight: { xs: "350px", md: "445px" },
            background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), #494949",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: 1
        }}
    >
        <Skeleton
            variant="rectangular"
            sx={{
                width: 190,
                height: 32,
                mr: 3,
                alignSelf: "end",
                borderRadius: "8px",
                backgroundColor: "rgba(255, 255, 255, 0.25)"
            }}
        />
        <Box sx={{ display: "flex", gap: 1, overflow: "hidden", pb: 1 }}>
            <Skeleton
                variant="rectangular"
                sx={{
                    width: { xs: "72%", md: "46%" },
                    aspectRatio: "16 / 9",
                    borderRadius: "10px",
                    backgroundColor: "rgba(255, 255, 255, 0.18)",
                    flexShrink: 0
                }}
            />
        </Box>
    </Box>
);

const RatingListSkeleton: React.FC<{ tint: string }> = ({ tint }) => (
    <Stack sx={{ borderRadius: "10px", pb: 1 }}>
        <Stack direction="row" sx={{ alignItems: "center", gap: 2, pr: 3, pb: 1 }}>
            <Skeleton variant="circular" sx={{ width: 30, height: 30 }} />
            <Skeleton variant="rectangular" sx={{ width: 110, height: 20, borderRadius: "10px" }} />
        </Stack>
        <Stack
            sx={{
                borderRadius: "10px",
                minHeight: { xs: "520px", md: "545px" },
                background: `linear-gradient(${tint}cc, ${tint}88)`,
                p: 2,
                gap: 1,
                justifyContent: "center"
            }}
        >
            {Array.from({ length: 9 }).map((_, index) => (
                <Stack
                    key={index}
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 3,
                        py: 0.5
                    }}
                >
                    <Skeleton
                        variant="rectangular"
                        sx={{
                            width: "58%",
                            height: 26,
                            borderRadius: "8px",
                            backgroundColor: "rgba(255, 255, 255, 0.25)"
                        }}
                    />
                    <Skeleton
                        variant="circular"
                        sx={{
                            width: 38,
                            height: 38,
                            backgroundColor: "rgba(255, 255, 255, 0.25)"
                        }}
                    />
                </Stack>
            ))}
        </Stack>
    </Stack>
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
