import axios, { isAxiosError } from "axios";
import CineSplainUser from "../types/cineSplainUser.ts";

export const retrieveUser = async (userId: string): Promise<CineSplainUser | null> => {
    try {
        const res = await axios.get(getCineSplainUserPath(userId));
        const user = res.data.data;
        return user.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist");
        }
        console.error(error);
        return null;
    }
};

export const createUser = async (newUser: CineSplainUser): Promise<CineSplainUser | null> => {
    try {
        const res = await axios.post(postCineSplainUserPath(), newUser);
        return res.data.data.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist");
        }
        console.error(error);
        return null;
    }
};

const getCineSplainUserPath = (userId: string) => `/api/user/${userId}`;
const postCineSplainUserPath = () => "/api/user/create";
