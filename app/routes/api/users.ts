import { json } from "@tanstack/start";
import { createAPIFileRoute } from "@tanstack/start/api";
import { prisma } from "~/lib/server/prisma";

export const APIRoute = createAPIFileRoute("/api/users")({
  GET: async ({ request, params }) => {
    const url = new URL(request.url);

    // Pagination parameters
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);
    const skip = (page - 1) * limit;

    // Optional filtering parameters
    const nameFilter = url.searchParams.get("name") || "";
    const emailFilter = url.searchParams.get("email") || "";

    try {
      // Fetch total count for pagination
      const totalUsers = await prisma.user.count({
        where: {
          name: { contains: nameFilter, mode: "insensitive" },
          email: { contains: emailFilter, mode: "insensitive" },
        },
      });

      // Fetch paginated and filtered users
      const users = await prisma.user.findMany({
        where: {
          name: { contains: nameFilter, mode: "insensitive" },
          email: { contains: emailFilter, mode: "insensitive" },
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          createdAt: true,
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      });

      return json({
        users,
        pagination: {
          total: totalUsers,
          page,
          limit,
          totalPages: Math.ceil(totalUsers / limit),
        },
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return json({ error: "Internal server error" }, { status: 500 });
    }
  },
});
