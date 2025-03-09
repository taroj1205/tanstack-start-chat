import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getChannel, getChannels } from "../db/chat";
import { Channel, Message } from "@prisma/client";
import { User } from "better-auth";

export interface MessageWithUser extends Message {
  user: User;
}

export interface ChannelWithMessages extends Channel {
  messages: MessageWithUser[];
}

export const fetchChannel = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data: id }) => getChannel(id));

export const fetchChannels = createServerFn({ method: "GET" }).handler(
  async () => getChannels()
);
