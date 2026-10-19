import { isAxiosError } from "axios";
import CineSplainUser from "../types/cineSplainUser.ts";
import { postData, retrieveData } from "./common.ts";

export const retrieveUser = async (userId: string): Promise<CineSplainUser | null> => {
    try {
        const payload = await retrieveData(getCineSplainUserPath(userId));
        const user = payload.data;
        return user.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist", { cause: error });
        }
        console.error(error);
        return null;
    }
};

export const createUser = async (newUser: CineSplainUser): Promise<CineSplainUser | null> => {
    try {
        const payload = await postData(postCineSplainUserPath(), newUser);
        return payload.data.results;
    } catch (error) {
        if (isAxiosError(error) && error?.response?.status === 404) {
            throw new Error("User doesn't exist", { cause: error });
        }
        console.error(error);
        return null;
    }
};

const getCineSplainUserPath = (userId: string) => `/api/user/${userId}`;
const postCineSplainUserPath = () => "/api/user/create";
