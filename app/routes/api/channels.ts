import { createAPIFileRoute } from "@tanstack/start/api";
import { json } from "@tanstack/start";
import { prisma } from "~/lib/server/prisma";

export const APIRoute = createAPIFileRoute("/api/channels")({
  GET: async ({ request }) => {
    try {
      // Fetch all channels with their basic information
      const channels = await prisma.channel.findMany({
        include: {
          _count: {
            select: { messages: true, users: true },
          },
        },
      });

      return json(
        {
          status: "success",
          channels: channels.map((channel) => ({
            id: channel.id,
            name: channel.name,
            messageCount: channel._count.messages,
            userCount: channel._count.users,
            createdAt: channel.createdAt?.toISOString(),
            updatedAt: channel.updatedAt?.toISOString(),
          })),
          timestamp: new Date().toISOString(),
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error fetching channels:", error);
      return json(
        {
          status: "error",
          message: "Failed to fetch channels",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }
  },
});
