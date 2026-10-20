import axios from "axios";
import { createServerFn } from "@tanstack/react-start";
import { serverRequest } from "./backend.server.ts";

const serverHttpCall = createServerFn({ method: "POST" })
    .validator((input: { url: string; method: "GET" | "POST"; body?: string }) => input)
    .handler(async ({ data }) => await serverRequest(data.url, data.method, data.body));

const getClientData = async (url: string) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json"
        }
    };
    return (await axios.get(url, options)).data;
};

const getClientPayload = async (url: string, payload: unknown) => {
    return (await axios.post(url, payload)).data;
};

export const retrieveData = async (url: string) => {
    if (typeof window === "undefined") {
        // SSR: resolve the caller's origin and forward their cookies
        return await serverHttpCall({ data: { url, method: "GET" } });
    }
    return await getClientData(url);
};

export const postData = async (url: string, payload: unknown) => {
    if (typeof window === "undefined") {
        // SSR: resolve the caller's origin and forward their cookies
        return await serverHttpCall({
            data: { url, method: "POST", body: JSON.stringify(payload) }
        });
    }
    return await getClientPayload(url, payload);
};
