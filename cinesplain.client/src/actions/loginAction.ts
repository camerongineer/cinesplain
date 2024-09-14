import { isAxiosError } from "axios";
import { redirect } from "react-router-dom";
import { loginUser } from "../api/usersApi.ts";
import LoginSubmitDto from "../types/loginSubmitDto.ts";
import { queryClient } from "../ui/components/Router.tsx";

const loginAction = async (params: { request: { formData: () => any } }) => {
  const data = await params.request.formData();
  const redirectUrl = data.get("redirect") as string | null;

  const submission: LoginSubmitDto = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    await loginUser(submission);
    await queryClient.invalidateQueries({ queryKey: ["user"] });
    return redirect(redirectUrl || "/");
  } catch (error) {
    if (isAxiosError(error) && error?.response?.status === 401) {
      throw redirect("/");
    }
  }
  return null;
};

export default loginAction;
