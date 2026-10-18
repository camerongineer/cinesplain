import { redirect } from "react-router-dom";
import { retrieveUser } from "../api/usersApi.ts";
import UserInfo from "../types/userInfo.ts";
import authLoader from "./authLoader.ts";

const joinPageLoader = async (): Promise<UserInfo | null> => {
    const userAuth = await authLoader();
    if (!userAuth) throw redirect("/login");
    let user;
    if (userAuth) {
        try {
            user = await retrieveUser(userAuth.userId);
        } catch {
            return userAuth;
        }
    }
    if (user) window.location.replace("/");
    return null;
};

export default joinPageLoader;
