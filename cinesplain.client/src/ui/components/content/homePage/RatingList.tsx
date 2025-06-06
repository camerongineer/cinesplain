import { Stack, styled, Table, TableBody, TableContainer, useMediaQuery, useTheme } from "@mui/material";
import { SxProps } from "@mui/system";
import { BACKDROP_SIZE } from "../../../../constants/ImageSizes";
import useMovieBackdrop from "../../../../hooks/UseMovieBackdrop";
import useRandomMovie from "../../../../hooks/UseRandomMovie";
import Movie from "../../../../types/movie.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";
import OverlaidImageBox from "../../common/OverlaidImageBox";
import ListLabel from "./ListLabel";
import RatingListRow from "./RatingListRow";

const StyledStack = styled(Stack)`
    border-radius: 10px;
    transition: opacity ${(props) => props.theme.transitions.duration.short}ms ease-in-out;
`;

interface RatingListProps {
    movies: Movie[];
    backgroundOverlayColor: string;
    labelText: string;
    backdropInterval: number;
    outerSx?: SxProps;
    innerSx?: SxProps;
}

const RatingList: React.FC<RatingListProps> = ({
    movies,
    backgroundOverlayColor,
    labelText,
    backdropInterval,
    outerSx,
    innerSx
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
    const randomMovie = useRandomMovie(movies, backdropInterval, true);
    const [movieBackdrop, movieBackdropLoading] = useMovieBackdrop(randomMovie, BACKDROP_SIZE.LG_W1280);

    return (
        <>
            <StyledStack
                sx={{
                    ...outerSx,
                    opacity: movieBackdropLoading ? 0 : 1
                }}
            >
                {!isSmallScreen && <ListLabel labelText={labelText} pb={1} pr={3} />}
                <OverlaidImageBox
                    sx={innerSx}
                    backgroundImageUrl={movieBackdrop}
                    imageAlt={`${labelText} backdrop`}
                    overlayColor={backgroundOverlayColor}
                    borderRadius="10px"
                    bottomLabelText={randomMovie.title}
                >
                    <TableContainer className="center" component={Stack} marginY={5}>
                        {isSmallScreen && (
                            <ListLabel
                                labelText={labelText}
                                color={(theme) => theme.palette.getContrastText(backgroundOverlayColor)}
                                fontWeight={900}
                                pb={2}
                                zIndex={1}
                            />
                        )}
                        <Table
                            size="small"
                            sx={{
                                width: "90%",
                                height: "80%",
                                zIndex: 1
                            }}
                        >
                            <TableBody>
                                {movies.map((movie) => (
                                    <RatingListRow
                                        key={movie.id}
                                        movie={movie}
                                        link={`/movies/${getFormattedMovieLinkId(movie)}`}
                                        backgroundColor={backgroundOverlayColor}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </OverlaidImageBox>
            </StyledStack>
        </>
    );
};

export default RatingList;
