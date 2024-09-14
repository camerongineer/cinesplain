import axios, { isAxiosError } from "axios";
import CineSplainUser from "../types/cineSplainUser";
import JoinSubmitDto from "../types/joinSubmitDto";
import LoginSubmitDto from "../types/loginSubmitDto";

export const loginUser = async (submission: LoginSubmitDto) => {
    try {
        return await axios.post("/api/login", submission);
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 401) {
            throw new Error("Invalid email or password");
        }
        console.error(error);
        return null;
    }
};

export const retrieveUser = async (): Promise<CineSplainUser | null> => {
    try {
        const res = await axios.get(getCineSplainUserPath());
        return res.data;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 401) {
            throw new Error("User is not authenticated");
        }
        console.error(error);
        return null;
    }
};

export const createUser = async (submission: JoinSubmitDto): Promise<CineSplainUser | null> => {
    try {
        const res = await axios.post(postCineSplainUserPath(), submission);
        return res.data.data.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist");
        }
        console.error(error);
        return null;
    }
};

const getCineSplainUserPath = () => `/api/user`;
const postCineSplainUserPath = () => "/api/register";
