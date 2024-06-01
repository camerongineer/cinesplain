import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import { Avatar, Stack, styled, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { PROFILE_SIZE } from "../../../../constants/ImageSizes.ts";
import listDisplayMovieCastCredit from "../../../../types/listDisplayMovieCastCredit.ts";
import Person from "../../../../types/person.ts";
import { getFormattedPersonLinkId } from "../../../../utils/formatUtils.ts";

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

interface MovieCastCreditsListRowProps {
    castCredit: listDisplayMovieCastCredit;
}

const MovieCastCreditsListRow: React.FC<MovieCastCreditsListRowProps> = ({ castCredit }) => {
    const navigate = useNavigate();
    const onRowClick = () => navigate(`/person/${getFormattedPersonLinkId(castCredit as unknown as Person)}`);

    const altSilhouette =
        castCredit.gender === 1 ? femaleSilhouette : castCredit.gender === 2 ? maleSilhouette : neutralSilhouette;

    return (
        <StyledTableRow onClick={onRowClick}>
            <TableCell>
                <Stack direction="row" justifyContent="start" alignItems="center" spacing={2}>
                    <Avatar
                        src={
                            castCredit.profilePath
                                ? getImagePath(castCredit.profilePath, PROFILE_SIZE.SM_W45)
                                : altSilhouette
                        }
                        alt={castCredit.name}
                        sx={{
                            width: 45,
                            height: 45
                        }}
                    />
                    <Stack width="100%">
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            textAlign={{
                                xs: "end"
                            }}
                        >
                            {castCredit.name}
                        </Typography>
                        {castCredit.character && (
                            <Typography
                                variant="subtitle1"
                                fontSize="small"
                                textAlign={{
                                    xs: "end"
                                }}
                            >
                                as {castCredit.character}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </TableCell>
        </StyledTableRow>
    );
};

export default MovieCastCreditsListRow;
