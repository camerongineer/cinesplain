import { createFileRoute } from "@tanstack/react-router";
import { forwardRequest } from "../api/backend.server.ts";

/**
 * Catch-all proxy for the ASP.NET backend's API. Forwards method, path, query,
 * cookies and body verbatim so backend endpoints are reachable from the app's
 * single origin in every environment.
 */
export const Route = createFileRoute("/api/$")({
    server: {
        handlers: {
            ANY: async ({ request }) => await forwardRequest(request)
        }
    }
});
