import { createFileRoute } from "@tanstack/react-router";
import { forwardRequest } from "../api/backend.server.ts";

/**
 * Catch-all proxy for Azure Easy Auth's /.auth endpoints (login, logout and
 * /.auth/me). Forwards method, path, query, cookies and body verbatim.
 */
export const Route = createFileRoute("/.auth/$")({
    server: {
        handlers: {
            ANY: async ({ request }) => await forwardRequest(request)
        }
    }
});
