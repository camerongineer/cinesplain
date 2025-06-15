import femaleSilhouette from "@assets/silhouette_female.svg";
import maleSilhouette from "@assets/silhouette_male.svg";
import neutralSilhouette from "@assets/silhouette_neutral.svg";
import { Avatar, Stack, styled, TableCell, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getImagePath } from "../../../../api/moviesApi.ts";
import { PROFILE_SIZE } from "../../../../constants/ImageSizes.ts";
import listDisplayMovieCrewCredit from "../../../../types/listDisplayMovieCrewCredit.ts";
import Person from "../../../../types/person.ts";
import { getFormattedPersonLinkId } from "../../../../utils/formatUtils.ts";

const StyledTableRow = styled(TableRow)`
    cursor: pointer;

    &:hover {
        background-color: #00000030;
    }

    & td,
    & th {
        border: 0;
    }
`;

interface MovieCrewCreditsListRowProps {
    crewCredit: listDisplayMovieCrewCredit;
}

const MovieCastCreditsListRow: React.FC<MovieCrewCreditsListRowProps> = ({ crewCredit }) => {
    const navigate = useNavigate();
    const onRowClick = () => navigate(`/person/${getFormattedPersonLinkId(crewCredit as unknown as Person)}`);

    const altSilhouette =
        crewCredit.gender === 1 ? femaleSilhouette : crewCredit.gender === 2 ? maleSilhouette : neutralSilhouette;

    return (
        <StyledTableRow onClick={onRowClick}>
            <TableCell>
                <Stack direction="row" justifyContent="end" alignItems="center" spacing={2}>
                    <Avatar
                        src={
                            crewCredit.profilePath
                                ? getImagePath(crewCredit.profilePath, PROFILE_SIZE.SM_W45)
                                : altSilhouette
                        }
                        alt={crewCredit.name}
                        sx={{
                            order: {
                                xs: -1,
                                sm: 1
                            },
                            width: 45,
                            height: 45,
                        }}
                    />
                    <Stack width="100%" px={.5}>
                        <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            textAlign={{
                                xs: "end",
                                sm: "start"
                            }}
                        >
                            {crewCredit.name}
                        </Typography>
                        {crewCredit.job && (
                            <Typography
                                variant="subtitle1"
                                fontSize="small"
                                textAlign={{
                                    xs: "end",
                                    sm: "start"
                                }}
                            >
                                {crewCredit.job}
                            </Typography>
                        )}
                    </Stack>
                </Stack>
            </TableCell>
        </StyledTableRow>
    );
};

export default MovieCastCreditsListRow;
