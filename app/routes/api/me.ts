import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";

export const APIRoute = createAPIFileRoute("/api/me")({
  GET: ({ request, params }) => {
    return json({
      method: request.method,
      url: request.url,
      headers: Object.fromEntries(request.headers.entries()),
      body: request.body ? "Present" : "Empty",
      timestamp: new Date().toISOString(),
    });
  },
});
