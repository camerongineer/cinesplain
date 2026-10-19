import { Link as MuiLink, styled, TableCell, TableRow, useTheme } from "@mui/material";
import { Link } from "@tanstack/react-router";
import Movie from "../../../../types/movie.ts";
import PopcornRating from "../../common/PopcornRating";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";

const StyledTableRow = styled(TableRow)`
    &:hover > img {
        filter: saturate(150%);
    }
`;

interface RatingListRowProps {
    movie: Movie;
    backgroundColor: string;
}

const RatingListRow: React.FC<RatingListRowProps> = ({ movie, backgroundColor }) => {
    const { palette } = useTheme();

    return (
        <StyledTableRow>
            <TableCell sx={{ borderBottom: "none" }}>
                <Link to="/movies/$movieId" params={{ movieId: getFormattedMovieLinkId(movie) }}>
                    <MuiLink
                        component="span"
                        variant="overline"
                        underline="none"
                        sx={{
                            fontStyle: "italic",
                            fontSize: "medium",
                            color: palette.getContrastText(backgroundColor),
                            fontWeight: 600,

                            "&:hover": {
                                fontStyle: "normal",
                                fontWeight: 900
                            }
                        }}
                    >
                        {movie.title}
                    </MuiLink>
                </Link>
            </TableCell>
            {!!movie.voteAverage && (
                <TableCell width={30} sx={{ borderBottom: "none" }}>
                    <Link to="/movies/$movieId" params={{ movieId: getFormattedMovieLinkId(movie) }}>
                        {movie?.voteCount > 5 && <PopcornRating voteAverage={movie.voteAverage} />}
                    </Link>
                </TableCell>
            )}
        </StyledTableRow>
    );
};

export default RatingListRow;
