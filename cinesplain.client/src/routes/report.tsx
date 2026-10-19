import { createServerFn } from "@tanstack/react-start";
import { createFileRoute } from "@tanstack/react-router";
import ReportPage from "../ui/components/content/reportPage/ReportPage";

const reportIssue = createServerFn({ method: "POST" })
    .validator((data: FormData) => data)
    .handler(async ({ data }) => {
        // TODO: POST the collected report to the backend API
        // (the ASP.NET /api/report endpoint does not exist yet).
        void data;
        return { received: true };
    });

export const Route = createFileRoute("/report")({
    component: ReportPage
});

export { reportIssue };
