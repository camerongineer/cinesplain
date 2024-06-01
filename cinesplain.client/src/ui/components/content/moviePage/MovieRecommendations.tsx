import { Box, Stack, styled, Typography, useTheme } from "@mui/material";
import Movie from "../../../../types/movie.ts";
import CSLoadingIcon from "../../common/CSLoadingIcon";
import BackdropImageListRow from "../common/BackdropImageListRow";

const StyledStack = styled(Stack)`
    justify-content: center;
    align-items: center;
    transition: ${(props) => `opacity ${props.theme.transitions.duration.short}ms ease-in-out`};
`;

interface MovieRecommendationsProps {
    recommendedMovies: Movie[];
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ recommendedMovies }) => {
    const theme = useTheme();
    const cardStyle = {
        width: {
            xs: theme.breakpoints.values.sm / 3,
            md: theme.breakpoints.values.lg / 4,
            lg: theme.breakpoints.values.xl / 5.3
        }
    };
    return (
        <StyledStack className="full center">
            <Box
                display="flex"
                alignItems="center"
                padding=".5em 1em 0"
                alignSelf={{
                    xs: "center",
                    md: "end"
                }}
            >
                <CSLoadingIcon height={30} />
                <Typography variant="h5" fontWeight="bold">
                    Recommendations
                </Typography>
            </Box>
            <BackdropImageListRow movies={recommendedMovies} cardStyle={cardStyle} />
        </StyledStack>
    );
};

export default MovieRecommendations;
