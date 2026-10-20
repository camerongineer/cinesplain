import tmdb from "@assets/tmdb_logo.svg";
import { Box, Stack, styled, Typography } from "@mui/material";

const StyledStack = styled(Stack)`
    align-items: center;
    justify-content: center;
    margin: 0.5em 1em;
`;

const DataCreditDisplay: React.FC = () => (
    <StyledStack>
        <Typography
            variant="overline"
            style={{ userSelect: "none" }}
            sx={{
                textAlign: "center"
            }}
        >
            Data Provided By
        </Typography>
        <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer">
            <Box
                component="img"
                src={tmdb as unknown as string}
                alt="Link to TMDB"
                sx={{
                    height: 12
                }}
            />
        </a>
        <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">
            <Typography
                sx={{
                    fontFamily: "Open Sans",
                    fontWeight: "bold",
                    color: "text.secondary"
                }}
            >
                OMDb API
            </Typography>
        </a>
    </StyledStack>
);

export default DataCreditDisplay;
