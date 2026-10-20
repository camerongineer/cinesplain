import { Typography, useTheme } from "@mui/material";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import SpotlightList from "../../../../types/SpotlightList";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import BackdropImageListRow from "../common/BackdropImageListRow";

interface RecentMoviesRowProps {
    list: SpotlightList;
}

const RecentMoviesRow: React.FC<RecentMoviesRowProps> = ({ list }) => {
    const randomMovie = useRandomMovie(list.movies, list.spotlightSeed, 20000);
    const [movieBackdrop, movieBackdropPreview] = useMovieBackdrop(randomMovie);
    const theme = useTheme();
    const backdropStyle = {
        flex: 4,
        alignItems: "center",
        justifyContent: "end",
        width: "100%",
        justifySelf: "end"
    };

    if (!randomMovie) {
        return null;
    }

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
            lowResolutionImageUrl={movieBackdropPreview}
            imageAlt={`${randomMovie.title} backdrop`}
            imageGrayScalePercentage={75}
            overlayColor={"#000000"}
            borderRadius="0"
            bottomLabelText={randomMovie.title}
        >
            <Typography
                variant="h5"
                color={theme.palette.getContrastText(theme.palette.common.black)}
                style={{ userSelect: "none" }}
                sx={{
                    width: "fit-content",
                    fontWeight: "bolder",
                    alignSelf: "end",
                    zIndex: 1,
                    mr: 3
                }}
            >
                Now In Theaters
            </Typography>
            <BackdropImageListRow movies={list.movies} cardStyle={cardStyle} />
        </OverlaidImageBox>
    );
};

export default RecentMoviesRow;
