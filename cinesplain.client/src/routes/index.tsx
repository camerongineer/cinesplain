import { createFileRoute } from "@tanstack/react-router";
import { homePageQuery } from "../queries/homePage";
import HomePage from "../ui/components/content/homePage/HomePage";

export const Route = createFileRoute("/")({
    loader: ({ context }) => context.queryClient.ensureQueryData(homePageQuery),
    component: HomePage
});
