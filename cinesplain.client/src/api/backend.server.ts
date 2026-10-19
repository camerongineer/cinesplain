import { getRequest } from "@tanstack/react-start/server";

/**
 * Server-only backend plumbing.
 *
 * In development both the SSR process and these proxy routes talk to the ASP.NET
 * backend over HTTPS with the ASP.NET developer certificate, which Node does not
 * trust by default. Relax certificate validation outside production; production
 * traffic goes to trusted origins and validation stays intact.
 */
if (process.env.NODE_ENV !== "production") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

/**
 * Absolute address of the ASP.NET backend. Required by the /api and /.auth proxy
 * routes. Server-side data fetching uses the SSR request's own origin by default
 * (single-origin proxying), and this endpoint only when explicitly configured.
 */
export const getBackendEndpoint = () => process.env.API_ENDPOINT ?? "https://localhost:7232";

/**
 * Resolves the absolute base URL for server-side requests and forwards the
 * caller's cookies (required for Azure Easy Auth authorization).
 *
 * By default requests go to the same origin that served the page, which has the
 * /api and /.auth routes wired to the ASP.NET backend (dev: server routes in
 * this app, prod: the reverse proxy in front of them). Set API_ENDPOINT to send
 * requests to the backend directly instead.
 */
const getServerRequestInfo = () => {
    const request = getRequest();
    const url = new URL(request.url);
    const base = process.env.API_ENDPOINT ?? `${url.protocol}//${url.host}`;
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

/** Header and reject manually forwarded loopback requests. */
const FORWARDED_HEADER = "x-cinesplain-forwarded";
const HOP_HEADERS = [
    "connection",
    "keep-alive",
    "transfer-encoding",
    "upgrade",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "content-encoding",
    "content-length",
    "host"
];

/**
 * Forwards an incoming server-route request to the ASP.NET backend, preserving
 * the method, path, query, cookies and body so backend endpoints behave as if
 * they were called directly.
 */
export const forwardRequest = async (request: Request) => {
    if (request.headers.get(FORWARDED_HEADER)) {
        return new Response("Proxy loop detected", { status: 500 });
    }
    const requestUrl = new URL(request.url);
    const backendUrl = new URL(getBackendEndpoint());
    const headers = new Headers(request.headers);
    for (const name of HOP_HEADERS) {
        headers.delete(name);
    }
    headers.set(FORWARDED_HEADER, "1");
    headers.set("host", backendUrl.host);

    const method = request.method;
    const body = method === "GET" || method === "HEAD" ? undefined : await request.arrayBuffer();

    const response = await fetch(`${backendUrl.origin}${requestUrl.pathname}${requestUrl.search}`, {
        headers,
        method,
        body
    });

    const responseHeaders = new Headers(response.headers);
    for (const name of HOP_HEADERS) {
        responseHeaders.delete(name);
    }
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders
    });
};
