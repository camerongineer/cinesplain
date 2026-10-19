import { getRequest } from "@tanstack/react-start/server";

/**
 * Resolves the absolute base URL for server-side requests and forwards the
 * caller's cookies (required for Azure Easy Auth authorization).
 *
 * By default requests go to the same origin that served the page, which gets
 * proxied on to the ASP.NET backend (dev: Vite proxy, prod: Yarp). If the SSR
 * process serves traffic directly instead, set API_BASE_URL to the absolute
 * backend address (e.g. "http://127.0.0.1:5030").
 */
const getServerRequestInfo = () => {
    const request = getRequest();
    const url = new URL(request.url);
    const base = process.env.API_BASE_URL ?? `${url.protocol}//${url.host}`;
    return {
        base,
        cookie: request.headers.get("cookie") ?? undefined
    };
};

export const serverRequest = async (url: string, method: "GET" | "POST", body?: string) => {
    const { base, cookie } = getServerRequestInfo();
    const response = await fetch(`${base}${url}`, {
        method,
        body,
        headers: {
            accept: "application/json",
            ...(body ? { "content-type": "application/json" } : {}),
            ...(cookie ? { cookie } : {})
        }
    });
    return await response.json();
};
