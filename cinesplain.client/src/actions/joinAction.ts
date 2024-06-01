import { redirect } from "react-router-dom";
import { createUser } from "../api/usersApi.ts";
import authLoader from "../loaders/authLoader.ts";
import CineSplainUser from "../types/cineSplainUser.ts";

const joinAction = async (params: { request: { formData: () => any; }; }) => {
    const auth = await authLoader();
    if (!auth) redirect("/login");
    const data = await params.request.formData();
    
    const newUser: CineSplainUser = {
        id: auth?.userId ?? "",
        userName: data.get("userName"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        method: auth?.identityProvider ?? ""
    };
    return await createUser(newUser);
};

export default joinAction;