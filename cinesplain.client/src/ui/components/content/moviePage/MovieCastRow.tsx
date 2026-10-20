import { useSuspenseQuery } from "@tanstack/react-query";
import { movieCreditsQuery } from "../../../../queries/moviePage";
import CastMemberRow from "../common/CastMemberRow";

interface MovieCastRowProps {
    movieId: number;
}

const MovieCastRow: React.FC<MovieCastRowProps> = ({ movieId }) => {
    const { data: credits } = useSuspenseQuery(movieCreditsQuery(movieId));
    const displayedCast = credits?.cast.filter((castMember) => castMember.profilePath) ?? null;

    return displayedCast ? <CastMemberRow castMembers={displayedCast} /> : null;
};

export default MovieCastRow;
