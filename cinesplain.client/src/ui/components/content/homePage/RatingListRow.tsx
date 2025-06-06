import { Link as MuiLink, styled, TableCell, TableRow, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Movie from "../../../../types/movie.ts";
import PopcornRating from "../../common/PopcornRating";

const StyledTableRow = styled(TableRow)`
    &:hover > img {
        filter: saturate(150%);
    }
`;

interface RatingListRowProps {
    movie: Movie;
    link: string;
    backgroundColor: string;
}

const RatingListRow: React.FC<RatingListRowProps> = ({ movie, link, backgroundColor }) => {
    const { palette } = useTheme();

    return (
        <StyledTableRow>
            <TableCell sx={{ borderBottom: "none" }}>
                <RouterLink to={link}>
                    <MuiLink
                        component="span"
                        variant="overline"
                        fontStyle="italic"
                        fontSize="medium"
                        underline="none"
                        sx={{
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
                </RouterLink>
            </TableCell>
            {!!movie.voteAverage && (
                <TableCell width={30} sx={{ borderBottom: "none" }}>
                    <RouterLink to={link}>
                        {movie?.voteCount > 5 && <PopcornRating voteAverage={movie.voteAverage} />}
                    </RouterLink>
                </TableCell>
            )}
        </StyledTableRow>
    );
};

export default RatingListRow;
