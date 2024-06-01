import { retrieveUser } from "../api/usersApi.ts";
import CineSplainUser from "../types/cineSplainUser.ts";
import authLoader from "./authLoader.ts";

const csUserLoader = async (): Promise<CineSplainUser | null> => {
    const userAuth = await authLoader();
    if (userAuth) {
        try {
            return await retrieveUser(userAuth.userId);
        } catch (error) {
            console.log(error);
        }
    }
    return null;
};

export default csUserLoader;