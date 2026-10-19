import { postData, retrieveData } from "../api/common";
import CineSplainUser from "../types/cineSplainUser";
import UserInfo from "../types/userInfo";

/**
 * Fetches the Azure Easy Auth client principal for the current user.
 * Returns null when the caller is not authenticated.
 */
export const retrieveAuthenticatedPrincipal = async (): Promise<UserInfo | null> => {
    try {
        const payload = await retrieveData("/.auth/me");
        const { clientPrincipal } = payload;
        if (clientPrincipal) {
            if (clientPrincipal.identityProvider === "aad") {
                clientPrincipal.identityDetails = "Microsoft";
            } else if (clientPrincipal.identityProvider === "github") {
                clientPrincipal.identityDetails = "Github";
            } else {
                clientPrincipal.identityDetails = null;
            }
        }
        return clientPrincipal;
    } catch (error) {
        return null;
    }
};

/**
 * Fetches the CineSplain user profile for the given Easy Auth user id.
 * Returns null when the user has not joined yet.
 */
export const retrieveCineSplainUser = async (userId: string): Promise<CineSplainUser | null> => {
    const payload = await retrieveData(`/api/user/${userId}`);
    return payload.results ?? null;
};

/**
 * Creates a CineSplain user profile for the given Easy Auth user.
 */
export const createCineSplainUser = async (newUser: CineSplainUser): Promise<CineSplainUser | null> => {
    const payload = await postData("/api/user/create", newUser);
    return payload.results ?? null;
};
