import { Card, styled } from "@mui/material";
import omdbMovieDetails from "../../../../types/OmdbMovieDetails.ts";
import Movie from "../../../../types/movie.ts";
import { roundedToTenth } from "../../../../utils/formatUtils.ts";
import CSRatingDisplay from "./CSRatingDisplay.tsx";
import ImdbRatingDisplay from "./ImdbRatingDisplay.tsx";
import MetascoreDisplay from "./MetascoreDisplay.tsx";
import RottenTomatoesDisplay from "./RottenTomatoesDisplay.tsx";

const StyledCard = styled(Card)`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em 2em;
    background-color: #00000030;
`;

interface RatingCardProps {
    movie: Movie;
    omdbDetails?: omdbMovieDetails | null;
}

const RatingCard: React.FC<RatingCardProps> = ({ movie, omdbDetails }) => {
    const ratings = omdbDetails?.ratingDetails ?? null;
    if (
        (!movie.voteAverage || movie.voteCount <= 5) &&
        !ratings?.rottenTomatoesScore &&
        !ratings?.imdbRating &&
        !ratings?.metascore
    )
        return null;
    return (
        <StyledCard elevation={3}>
            {!!movie.voteAverage && <CSRatingDisplay voteAverage={roundedToTenth(movie.voteAverage)} />}
            {!!ratings?.rottenTomatoesScore && (
                <RottenTomatoesDisplay rottenTomatoesScore={ratings.rottenTomatoesScore} />
            )}
            {!!ratings?.imdbRating && <ImdbRatingDisplay imdbRating={ratings.imdbRating} />}
            {!!ratings?.metascore && <MetascoreDisplay metaScore={ratings.metascore} />}
        </StyledCard>
    );
};

export default RatingCard;
