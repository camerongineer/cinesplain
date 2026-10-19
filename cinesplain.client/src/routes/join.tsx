import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { createUser } from "../api/usersApi";
import { retrieveAuthenticatedPrincipal } from "../auth/authService";
import { authQuery, csUserQuery } from "../queries/auth";
import CineSplainUser from "../types/cineSplainUser";
import JoinPage from "../ui/components/content/joinPage/JoinPage";

const joinCineSplain = createServerFn({ method: "POST" })
    .validator((data: FormData) => data)
    .handler(async ({ data }) => {
        const principal = await retrieveAuthenticatedPrincipal();
        if (!principal) {
            throw redirect({ to: "/login" });
        }
        const newUser: CineSplainUser = {
            id: principal.userId,
            userName: data.get("userName")?.toString() ?? "",
            firstName: data.get("firstName")?.toString() ?? "",
            lastName: data.get("lastName")?.toString() ?? "",
            email: data.get("email")?.toString() ?? "",
            method: principal.identityProvider ?? ""
        };
        return await createUser(newUser);
    });

export const Route = createFileRoute("/join")({
    loader: async ({ context }) => {
        const principal = await context.queryClient.ensureQueryData(authQuery);
        if (!principal) {
            throw redirect({ to: "/login" });
        }
        let user = null;
        try {
            user = await context.queryClient.ensureQueryData(csUserQuery(principal));
        } catch (error) {
            user = null;
        }
        if (user) {
            throw redirect({ to: "/" });
        }
        return null;
    },
    component: JoinPage
});

export { joinCineSplain };
