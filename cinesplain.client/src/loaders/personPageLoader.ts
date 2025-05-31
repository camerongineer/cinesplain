import { QueryClient, queryOptions } from "@tanstack/react-query";
import { Params } from "react-router-dom";
import { retrievePerson } from "../api/moviesApi";
import CastMember from "../types/castMember";
import CrewMember from "../types/crewMember";
import { getNumericId } from "../utils/formatUtils";

const personPageQuery = (personId: string | undefined) =>
    queryOptions({
        queryKey: ["personPage", personId],
        queryFn: async () => {
            const person = await retrievePerson(getNumericId(personId ?? ""));
            if (!person) {
                throw new Error("This page doesn't not exist.");
            }
            const movieCastCredits = person.movieCredits.cast?.filter((movie) => movie.releaseDate) ?? [];
            const sortedMovieCastCredits: CastMember[] = movieCastCredits.sort((a, b) => {
                if (a.releaseDate && b.releaseDate) {
                    return a.releaseDate < b.releaseDate ? 1 : -1;
                }
                return 0;
            });
            const movieCrewCredits = person.movieCredits.crew?.filter((movie) => movie.releaseDate) ?? [];
            const sortedMovieCrewCredits: CrewMember[] = movieCrewCredits.sort((a, b) => {
                if (a.releaseDate && b.releaseDate) {
                    return a.releaseDate < b.releaseDate ? 1 : -1;
                }
                return 0;
            });
            return { person, movieCastCredits: sortedMovieCastCredits, movieCrewCredits: sortedMovieCrewCredits };
        }
    });

const personPageLoader =
    (queryClient: QueryClient) =>
    async ({ params }: { params: Params }) => {
        const personId = params.personId;
        await queryClient.ensureQueryData(personPageQuery(personId));
    };

export { personPageLoader, personPageQuery };

