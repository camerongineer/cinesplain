import { Grid, Stack } from "@mui/material";
import { blue, pink, purple, red } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { homePageQuery } from "../../../../queries/homePage";
import Hero from "./Hero";
import RatingList from "./RatingList";
import RecentMoviesRow from "./RecentMoviesRow";

const HomePage: React.FC = () => {
    const { data } = useQuery(homePageQuery);
    useEffect(() => {
        document.title = "CineSplain - The Movie Info App";
    }, []);
    if (!data) {
        return null;
    }
    const { recentMovies, lovedMovies, hatedMovies, classicMovies, upcomingMovies } = data;

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
                <RecentMoviesRow movies={recentMovies} />
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
                <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{
                        padding: 1
                    }}
                >
                    <RatingList
                        movies={upcomingMovies}
                        backgroundOverlayColor={blue["900"]}
                        backdropInterval={25000}
                        labelText="Upcoming"
                    />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 7 }}
                    sx={{
                        padding: 1
                    }}
                >
                    <RatingList
                        movies={lovedMovies}
                        backgroundOverlayColor={pink["900"]}
                        backdropInterval={27500}
                        labelText="Most Loved"
                    />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 7 }}
                    sx={{
                        padding: 1
                    }}
                >
                    <RatingList
                        movies={hatedMovies}
                        backgroundOverlayColor={red["900"]}
                        backdropInterval={40000}
                        labelText="Most Hated"
                    />
                </Grid>
                <Grid
                    size={{ xs: 12, md: 5 }}
                    sx={{
                        padding: 1
                    }}
                >
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
