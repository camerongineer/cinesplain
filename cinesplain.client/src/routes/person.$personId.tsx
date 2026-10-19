/* oxlint-disable react/only-export-components -- TanStack file-based routes must export Route alongside components */
import { createFileRoute } from "@tanstack/react-router";
import { personPageQuery } from "../queries/personPage";
import PersonPage from "../ui/components/content/personPage/PersonPage";

const PersonRoute = () => {
    const { personId } = Route.useParams();
    return <PersonPage personId={personId} />;
};

export const Route = createFileRoute("/person/$personId")({
    validateSearch: (search: Record<string, string | undefined>) => search,
    loader: ({ context, params }) =>
        context.queryClient.ensureQueryData(personPageQuery(params.personId)),
    component: PersonRoute
});
