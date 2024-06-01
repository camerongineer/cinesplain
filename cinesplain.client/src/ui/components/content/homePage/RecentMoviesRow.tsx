import { Typography, useTheme } from "@mui/material";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import Movie from "../../../../types/movie.ts";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import BackdropImageListRow from "../common/BackdropImageListRow";

interface RecentMoviesRowProps {
    movies: Movie[];
}

const RecentMoviesRow: React.FC<RecentMoviesRowProps> = ({ movies }) => {
    const randomMovie = useRandomMovie(movies, 20000);
    const [movieBackdrop, movieBackdropLoading] = useMovieBackdrop(randomMovie);
    const theme = useTheme();

    const backdropStyle = {
        flex: 4,
        alignItems: "center",
        justifyContent: "end",
        width: "100%",
        opacity: movieBackdropLoading ? 0 : 1,
        transition: `opacity ${theme.transitions.duration.short}ms ease-in-out`,
        justifySelf: "end"
    };

    const cardStyle = {
        width: {
            xs: theme.breakpoints.values.sm / 2,
            md: theme.breakpoints.values.lg / 2.6,
            lg: theme.breakpoints.values.xl / 3.7,
            xl: theme.breakpoints.values.xl / 3.1
        }
    };

    return (
        <OverlaidImageBox
            sx={backdropStyle}
            backgroundImageUrl={movieBackdrop}
            imageAlt={`${randomMovie.title} backdrop`}
            imageGrayScalePercentage={75}
            overlayColor={"#000000"}
            borderRadius="0"
            bottomLabelText={randomMovie.title}
        >
            <Typography
                variant="h5"
                width="fit-content"
                color={theme.palette.getContrastText(theme.palette.common.black)}
                fontWeight="bolder"
                alignSelf="end"
                zIndex={1}
                mr={3}
                style={{ userSelect: "none" }}
            >
                Now In Theaters
            </Typography>
            <BackdropImageListRow movies={movies} cardStyle={cardStyle} />
        </OverlaidImageBox>
    );
};

export default RecentMoviesRow;
