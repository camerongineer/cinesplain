import { redirect } from "react-router-dom";
import { retrieveUser } from "../api/usersApi.ts";
import UserInfo from "../types/userInfo.ts";
import authLoader from "./authLoader.ts";

const loginPageLoader = async (): Promise<UserInfo | null> => {
    const userAuth = await authLoader();
    let user;
    if (userAuth) {
        try {
            user = await retrieveUser(userAuth.userId);
        } catch {
            user = null;
        }
    }
    if (userAuth && !user) throw redirect("/join");
    if (user) throw redirect("/");
    return null;
};

export default loginPageLoader;
