import { redirect } from "react-router-dom";
import { createUser } from "../api/usersApi.ts";
import authLoader from "../loaders/authLoader.ts";
import CineSplainUser from "../types/cineSplainUser.ts";

const joinAction = async (params: { request: { formData: () => FormData } }) => {
    const auth = await authLoader();
    if (!auth) throw redirect("/login");
    const data = await params.request.formData();
    const asString = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : "");

    const newUser: CineSplainUser = {
        id: auth?.userId ?? "",
        userName: asString(data.get("userName")),
        firstName: asString(data.get("firstName")),
        lastName: asString(data.get("lastName")),
        email: asString(data.get("email")),
        method: auth?.identityProvider ?? ""
    };
    return await createUser(newUser);
};

export default joinAction;
