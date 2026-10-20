import { queryOptions } from "@tanstack/react-query";
import { retrieveAuthenticatedPrincipal, retrieveCineSplainUser } from "../auth/authService";
import CineSplainUser from "../types/cineSplainUser";
import UserInfo from "../types/userInfo";

export const authQuery = queryOptions({
    queryKey: ["auth"],
    queryFn: retrieveAuthenticatedPrincipal
});

export const csUserQuery = (principal: UserInfo | null) =>
    queryOptions({
        queryKey: ["csUser", principal?.userId ?? null],
        enabled: !!principal,
        queryFn: async (): Promise<CineSplainUser | null> => {
            if (!principal) {
                return null;
            }
            return await retrieveCineSplainUser(principal.userId);
        }
    });
