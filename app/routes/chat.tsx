import { redirect } from "@tanstack/react-router";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Grid, GridItem } from "@yamada-ui/react";
import {
  ChatWindowSkeleton,
  Sidebar,
  SidebarSkeleton,
} from "~/components/chat";
import { fetchChannels } from "~/utils/chat";
import { AuthComponent } from "./auth";
import { Suspense } from "react";
import { getSession } from "~/lib/client/auth";

export const Route = createFileRoute("/chat")({
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth" });
    }
    return { channels: await fetchChannels() };
  },
  loader: ({ context }) => {
    return { channels: context.channels, user: context.user };
  },
  component: () => <ChatLayout />,
  pendingComponent: () => (
    <Grid gridTemplateColumns="auto 1fr" flexGrow={1} h="full">
      <GridItem display="grid" gridTemplateRows="1fr auto">
        <SidebarSkeleton />
      </GridItem>
      <GridItem flex={1}>
        <ChatWindowSkeleton />
      </GridItem>
    </Grid>
  ),
});

function ChatLayout() {
  const context = Route.useLoaderData();

  return (
    <Grid
      as="main"
      gridTemplateColumns={{ base: "auto 1fr", lg: "1fr" }}
      flexGrow={1}
      h="full"
      w="full"
    >
      <GridItem display={{ lg: "none" }}>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar channels={context.channels} user={context.user} />
        </Suspense>
      </GridItem>
      <GridItem flex={1}>
        <Suspense fallback={<ChatWindowSkeleton />}>
          <Outlet />
        </Suspense>
      </GridItem>
    </Grid>
  );
}
