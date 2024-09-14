import axios, { isAxiosError } from "axios";
import { redirect } from "react-router-dom";

const authLoader = async () => {
    try {
        const response = await axios.get("/api/user");
        if (response.status === 200) redirect("/");
        return null;
    } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) return redirect("/login");
        throw error;
    }
};

export default authLoader;