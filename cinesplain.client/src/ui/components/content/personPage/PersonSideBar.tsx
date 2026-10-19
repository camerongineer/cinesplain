import imdb from "@assets/imdb_logo.svg";
import { Box, Link as MuiLink, Stack, Typography } from "@mui/material";
import { getImdbPersonPath } from "../../../../api/moviesApi.ts";
import Person from "../../../../types/person.ts";
import { getFormattedDisplayedDate } from "../../../../utils/formatUtils.ts";

interface PersonSideBarProps {
    person: Person;
}

const PersonSideBar: React.FC<PersonSideBarProps> = ({ person }) => (
    <Stack spacing={1}>
        <Typography variant="subtitle1">
            <strong>Known For:&nbsp;</strong>
            {person.knownForDepartment}
        </Typography>
        {person.placeOfBirth && (
            <Typography variant="subtitle1">
                <strong>Birth Place:&nbsp;</strong>
                {person.placeOfBirth}
            </Typography>
        )}
        {person.birthday && (
            <Typography variant="subtitle1">
                <strong>Born:&nbsp;</strong>
                {getFormattedDisplayedDate(person.birthday)}
            </Typography>
        )}
        {person.deathday && (
            <Typography variant="subtitle1">
                <strong>Died:&nbsp;</strong>
                {getFormattedDisplayedDate(person.deathday)}
            </Typography>
        )}
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
            {person.homepage && (
                <MuiLink component="a" href={person.homepage} target="_blank" rel="noopener noreferrer" variant="overline" fontSize="large" fontWeight="bolder">
                    Webpage
                </MuiLink>
            )}
            {person.imdbId && (
                <Box component="a" href={getImdbPersonPath(person.imdbId)} target="_blank" rel="noopener noreferrer">
                    <Box component="img" height="25px" src={imdb as unknown as string} alt="Link to IMDB" mt={0.75} />
                </Box>
            )}
        </Stack>
    </Stack>
);

export default PersonSideBar;
