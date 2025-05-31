import { Grid, Stack } from "@mui/material";
import { blue, pink, purple, red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { homePageQuery } from "../../../../loaders/homePageLoader";
import Hero from "./Hero";
import RatingList from "./RatingList";
import RecentMoviesRow from "./RecentMoviesRow";

const HomePage: React.FC = () => {
    const { data } = useQuery(homePageQuery);
    if (!data) {
        return null;
    }
    const { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies } = data;

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
                <Grid size={{ xs: 12, md: 5 }} padding={1}>
                    <RatingList
                        movies={upcomingMovies}
                        backgroundOverlayColor={blue["900"]}
                        backdropInterval={25000}
                        labelText="Upcoming"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} padding={1}>
                    <RatingList
                        movies={lovedMovies}
                        backgroundOverlayColor={pink["900"]}
                        backdropInterval={27500}
                        labelText="Most Loved"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 7 }} padding={1}>
                    <RatingList
                        movies={hatedMovies}
                        backgroundOverlayColor={red["900"]}
                        backdropInterval={40000}
                        labelText="Most Hated"
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }} padding={1}>
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

export default HomePage;
