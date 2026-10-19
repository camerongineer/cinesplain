/* oxlint-disable react/only-export-components -- TanStack file-based routes must export Route alongside components */
import { createFileRoute } from "@tanstack/react-router";
import { moviePageQuery } from "../queries/moviePage";
import MoviePage from "../ui/components/content/moviePage/MoviePage";

const MovieRoute = () => {
    const { movieId } = Route.useParams();
    return <MoviePage movieId={movieId} />;
};

export const Route = createFileRoute("/movies/$movieId")({
    validateSearch: (search: Record<string, string | undefined>) => search,
    loader: ({ context, params }) =>
        context.queryClient.ensureQueryData(moviePageQuery(params.movieId)),
    component: MovieRoute
});
