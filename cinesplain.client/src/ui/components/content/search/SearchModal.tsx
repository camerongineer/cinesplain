import { Box, Modal, styled } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { getMoviesSearchPath, retrieveMovies } from "../../../../api/moviesApi.ts";
import Movie from "../../../../types/movie.ts";
import MovieSearchRow from "./MovieSearchRow";
import SearchField from "./SearchField";

const StyledSearchBox = styled(Box)`
    min-width: 260px;
    width: 25%;
    margin-top: 2em;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

interface SearchModalProps {
    modalOpen: boolean;
    onModalEvent: () => void;
    autoCompleteList: string[];
}

const SearchModal: React.FC<SearchModalProps> = ({ modalOpen, onModalEvent, autoCompleteList }) => {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [movies, setMovies] = useState<Movie[]>([]);

    const handleMovieSubmit = (query: string) => {
        setSearchQuery(query);
    };

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.preventDefault();
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        let isMounted = true;
        let timeoutId: NodeJS.Timeout | null = null;

        const loadQueriedMovies = async () => {
            const queriedMovies = await retrieveMovies(getMoviesSearchPath(searchQuery));
            if (isMounted) {
                setMovies(queriedMovies ?? []);
            }
        };

        const delayedSearch = () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout(() => {
                if (!searchQuery) {
                    setMovies([]);
                } else {
                    loadQueriedMovies();
                }
            }, 500);
        };

        delayedSearch();

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            isMounted = false;
        };
    }, [searchQuery]);

    return (
        <>
            <Modal open={modalOpen} onClose={onModalEvent}>
                <>
                    <StyledSearchBox>
                        <SearchField
                            formId="modalSearch"
                            searchQuery={searchQuery}
                            autoCompleteList={autoCompleteList}
                            onQueryChange={handleQueryChange}
                            onQuerySubmit={handleMovieSubmit}
                            labelText="Enter a Movie title"
                        />
                    </StyledSearchBox>
                    <Box onClick={onModalEvent}>
                        <MovieSearchRow movies={movies} />
                    </Box>
                </>
            </Modal>
        </>
    );
};

export default SearchModal;
