import { createFileRoute } from "@tanstack/react-router";
import HomePage from "../ui/components/content/homePage/HomePage";

export const Route = createFileRoute("/")({
    component: HomePage
});
