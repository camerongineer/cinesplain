import { retrieveUser } from "../api/usersApi.ts";
import CineSplainUser from "../types/cineSplainUser.ts";

const csUserLoader = async (): Promise<CineSplainUser | null> => {
    let user = null;
    try {
        user = await retrieveUser();
    } catch (error) {
        console.log(error);
    };
    return user;
};

export default csUserLoader;