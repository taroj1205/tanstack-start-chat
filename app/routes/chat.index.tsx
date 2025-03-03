import { createFileRoute, redirect } from "@tanstack/react-router";
import { Heading } from "@yamada-ui/react";
import { fetchChannels } from "~/utils/chat";

export const Route = createFileRoute("/chat/")({
  beforeLoad: async () => {
    const channels = await fetchChannels();
    if (channels.length > 0) {
      throw redirect({
        to: "/chat/$chatid",
        params: { chatid: channels[0].id },
      });
    }
  },
  component: Home,
});

function Home() {
  return <Heading>No channels found</Heading>;
}
