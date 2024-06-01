import { Box, Stack, styled, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { POSTER_SIZE } from "../../../../constants/ImageSizes.ts";
import CastMember from "../../../../types/castMember.ts";
import Movie from "../../../../types/movie.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";

const StyledTableRow = styled(TableRow)`
    cursor: pointer;

    &:hover {
        background-color: #00000060;
    }

    & td,
    & th {
        border: 0;
    }
`;

interface CastCreditsListRowProps {
    castMemberCredit: CastMember;
}

const CastCreditsListRow: React.FC<CastCreditsListRowProps> = ({ castMemberCredit }) => {
    const navigate = useNavigate();
    const onRowClick = () =>
        navigate(
            `/movies/${getFormattedMovieLinkId({
                title: castMemberCredit.originalTitle,
                id: castMemberCredit.id
            } as unknown as Movie)}`
        );
    return (
        <StyledTableRow onClick={onRowClick}>
            <TableCell>
                <Stack direction="row" justifyContent="start" alignItems="center" spacing={2}>
                    {castMemberCredit.posterPath && (
                        <Box
                            component="img"
                            src={getImagePath(castMemberCredit.posterPath, POSTER_SIZE.XXXS_W92)}
                            width={45}
                            minHeight={castMemberCredit.posterPath ? 67.5 : "auto"}
                            loading="lazy"
                        />
                    )}
                    <Stack>
                        <Typography variant="subtitle2" fontWeight="bold">
                            {castMemberCredit.title}
                        </Typography>
                        {castMemberCredit.character && (
                            <Typography variant="subtitle2" fontSize="small">
                                as {castMemberCredit.character}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </TableCell>
            <TableCell component="th" scope="row" align="right">
                <Typography variant="subtitle2" fontWeight="bold">
                    {castMemberCredit.releaseDate ? new Date(castMemberCredit.releaseDate).getFullYear() : "Upcoming"}
                </Typography>
            </TableCell>
        </StyledTableRow>
    );
};

export default CastCreditsListRow;
