import { createUser } from "../api/usersApi.ts";
import JoinSubmitDto from "../types/joinSubmitDto.ts";

const joinAction = async (params: { request: { formData: () => any; }; }) => {
    const data = await params.request.formData();
    
    const submission: JoinSubmitDto = {
        email: data.get("email"),
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        password: data.get("password"),
        confirmPassword: data.get("confirmPassword")
    };
    return await createUser(submission);
};

export default joinAction;