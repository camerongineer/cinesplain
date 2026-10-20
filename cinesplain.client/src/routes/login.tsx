import { createFileRoute, redirect } from "@tanstack/react-router";
import { authQuery, csUserQuery } from "../queries/auth";
import LoginPage from "../ui/components/content/loginPage/LoginPage";

export const Route = createFileRoute("/login")({
    loader: async ({ context }) => {
        const principal = await context.queryClient.ensureQueryData(authQuery);
        if (!principal) {
            return null;
        }
        let user = null;
        try {
            user = await context.queryClient.ensureQueryData(csUserQuery(principal));
        } catch {
            user = null;
        }
        if (user) {
            throw redirect({ to: "/" });
        }
        throw redirect({ to: "/join" });
    },
    component: LoginPage
});
