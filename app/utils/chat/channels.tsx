import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { getChannel, getChannelMessages, getChannels } from "../db/chat";
import { Channel, Message, User } from "@prisma/client";
import { redirect } from "@tanstack/react-router";
import { auth } from "~/lib/server/auth";

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
