import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { prisma } from "~/lib/server/prisma";

export const APIRoute = createAPIFileRoute("/api/user")({
  GET: async ({ request, params }) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get("id");

    if (!userId) {
      return json({ error: "User ID is required" }, { status: 400 });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
          updatedAt: true,
          // Exclude sensitive information like tokens
        },
      });

      if (!user) {
        return json({ error: "User not found" }, { status: 404 });
      }

      return json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      return json({ error: "Internal server error" }, { status: 500 });
    }
  },
});
