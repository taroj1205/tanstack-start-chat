// routes/api/healthcheck.ts
import { createAPIFileRoute } from "@tanstack/start/api";
import { json } from "@tanstack/start";
import { prisma } from "~/lib/server/prisma"; // Import singleton Prisma client

export const APIRoute = createAPIFileRoute("/api/healthcheck")({
  GET: async ({ request }) => {
    try {
      // Check database connection
      await prisma.$connect();

      const databaseStatus = await prisma.user.count().catch(() => null);

      return json(
        {
          status: "healthy",
          database: databaseStatus !== null ? "connected" : "read_error",
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Database health check failed:", error);

      return json(
        {
          status: "unhealthy",
          database: "connection_error",
          error: error instanceof Error ? error.message : "Unknown error",
          timestamp: new Date().toISOString(),
        },
        { status: 503 }
      );
    } finally {
      // No need to manually disconnect in this case
      // Prisma will manage connections efficiently
    }
  },
});
