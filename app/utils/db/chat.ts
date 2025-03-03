import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Chat-related database functions
export const sendMessage = async (
  channelId: string,
  userId: string,
  content: string
) => {
  return await prisma.message.create({
    data: {
      content,
      userId,
      channelId,
    },
  });
};

export const getChannelMessages = async (channelId: string) => {
  return await prisma.message.findMany({
    where: { channelId },
    orderBy: { createdAt: "asc" },
    include: { user: true },
  });
};

export const createChannel = async (
  name: string,
  description: string,
  userId: string
) => {
  return await prisma.channel.create({
    data: { name, description, createdBy: userId },
  });
};

const DEFAULT_CHANNELS = [
  { name: "General", description: "A place for team-wide communication" },
  {
    name: "Random",
    description: "Off-topic conversations and fun discussions",
  },
  { name: "Help", description: "Ask questions and get support from the team" },
];

export const getUserChannels = async (userId: string) => {
  return await prisma.channel.findMany({
    where: {
      users: {
        some: { id: userId },
      },
    },
  });
};

export const getChannels = async () => {
  let systemUser = await prisma.user.findFirst({
    where: { name: "System" },
  });

  if (!systemUser) {
    systemUser = await prisma.user.create({
      data: {
        id: "system-user",
        name: "System",
        email: "system@example.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }

  // Create channels
  return await Promise.all(
    DEFAULT_CHANNELS.map(async (channelData) => {
      // Check if channel already exists
      const existingChannel = await prisma.channel.findFirst({
        where: { name: channelData.name },
      });

      if (existingChannel) {
        return existingChannel;
      }

      // Create channel
      return createChannel(
        channelData.name,
        channelData.description,
        systemUser.id
      );
    })
  );
};

export const getChannel = async (id: string) => {
  return await prisma.channel.findUnique({
    where: { id },
  });
};
