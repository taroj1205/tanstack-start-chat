import { PrismaClient } from "@prisma/client";
import { createServerFn } from "@tanstack/start";
import { z } from "zod";

const prisma = new PrismaClient();

// Validation schemas
const SendMessageSchema = z.object({
  channelId: z.string(),
  userId: z.string(),
  content: z.string().min(1, "Message cannot be empty"),
});

const CreateChannelSchema = z.object({
  name: z.string().min(1, "Channel name is required"),
  description: z.string().optional(),
  userId: z.string(),
});

// Chat-related database functions as server functions
export const sendMessage = createServerFn({ method: "POST" })
  .validator(SendMessageSchema)
  .handler(async ({ data }) => {
    const { channelId, userId, content } = data;

    // Validate channel exists
    const channel = await prisma.channel.findUnique({
      where: { id: channelId },
    });

    if (!channel) {
      throw new Error("Channel not found");
    }

    // Validate user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return await prisma.message.create({
      data: {
        content,
        userId,
        channelId,
      },
    });
  });

export const getChannelMessages = createServerFn({ method: "GET" })
  .validator((channelId: string) => channelId)
  .handler(async ({ data: channelId }) => {
    return await prisma.message.findMany({
      where: { channelId },
      orderBy: { createdAt: "asc" },
      include: { user: true },
    });
  });

export const createChannel = createServerFn({ method: "POST" })
  .validator(CreateChannelSchema)
  .handler(async ({ data }) => {
    const { name, description, userId } = data;

    return await prisma.channel.create({
      data: {
        name,
        description,
        createdBy: userId,
      },
    });
  });

export const getUserChannels = createServerFn({ method: "GET" })
  .validator((userId: string) => userId)
  .handler(async ({ data: userId }) => {
    return await prisma.channel.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
    });
  });

export const getChannels = createServerFn({ method: "GET" }).handler(
  async () => {
    return await prisma.channel.findMany();
  }
);

export const getChannel = createServerFn({ method: "GET" })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    return await prisma.channel.findUnique({
      where: { id },
    });
  });
