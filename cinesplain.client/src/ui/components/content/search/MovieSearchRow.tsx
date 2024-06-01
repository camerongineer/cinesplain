import { Stack, styled } from "@mui/material";
import { Link } from "react-router-dom";
import Movie from "../../../../types/movie.ts";
import { getFormattedMovieLinkId } from "../../../../utils/formatUtils.ts";
import OuterCarousel from "../../common/OuterCarousel";
import MovieCard from "../moviePage/MovieCard";

const StyledStack = styled(Stack)`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
    padding: 0 1em;

    & > * {
        flex-shrink: 0;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`;

interface MovieSearchRowProps {
    movies: Movie[];
}

const MovieSearchRow: React.FC<MovieSearchRowProps> = ({ movies }) => {
    return (
        <>
            {movies.length > 0 && (
                <OuterCarousel
                    sx={{
                        position: "absolute",
                        top: "50%",
                        transform: "translate(0, -50%)",
                        overflow: "auto",
                        height: "inherit",
                        "&::-webkit-scrollbar": {
                            display: "none"
                        }
                    }}
                >
                    <StyledStack>
                        {movies.length > 0 &&
                            movies.slice(0, 20).map((movie) => {
                                return (
                                    <Link key={movie.id} to={`/movies/${getFormattedMovieLinkId(movie)}`}>
                                        <MovieCard
                                            key={movie.id}
                                            movie={movie}
                                            posterSize="w342"
                                            sx={{
                                                height: "auto",
                                                width: {
                                                    xs: "200px",
                                                    md: "300px"
                                                },
                                                cursor: "pointer",
                                                margin: "10px"
                                            }}
                                            onHover={() => {}}
                                            isExpandable={true}
                                        />
                                    </Link>
                                );
                            })}
                    </StyledStack>
                </OuterCarousel>
            )}
        </>
    );
};

export default MovieSearchRow;
