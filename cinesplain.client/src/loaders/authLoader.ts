import UserInfo from "../types/userInfo.ts";

const authLoader = async (): Promise<UserInfo | null> => {
    try {
        const response = await fetch("/.auth/me");
        const payload = await response.json();
        const { clientPrincipal } = payload;
        if (clientPrincipal.identityProvider === "aad") {
            clientPrincipal.identityDetails = "Microsoft";
        } else if (clientPrincipal.identityProvider === "github") {
            clientPrincipal.identityDetails = "Github";
        } else {
            clientPrincipal.identityDetails = null;
        }
        return clientPrincipal;
    } catch (error) {
        return null;
    }
};

export default authLoader;