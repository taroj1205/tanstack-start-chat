import { redirect } from "@tanstack/react-router";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  DrawerOverlay,
  Grid,
  GridItem,
  IconButton,
  useDisclosure,
} from "@yamada-ui/react";
import {
  ChatWindowSkeleton,
  Sidebar,
  SidebarSkeleton,
} from "~/components/chat";
import { fetchChannels } from "~/utils/chat";
import { AuthComponent } from "./auth";
import { Suspense } from "react";
import { getSession } from "~/lib/client/auth";
import { MenuIcon, XIcon } from "@yamada-ui/lucide";

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

  if (!context.user)
    return (
      <Grid gridTemplateColumns="auto 1fr" flexGrow={1} h="full">
        <GridItem display="grid" gridTemplateRows="1fr auto">
          <SidebarSkeleton />
        </GridItem>
        <GridItem flex={1}>
          <ChatWindowSkeleton />
        </GridItem>
      </Grid>
    );

  const { open, onOpen, onClose } = useDisclosure();

  return (
    <Grid
      as="main"
      gridTemplateColumns={{ base: "auto 1fr", lg: "1fr" }}
      flexGrow={1}
      h="full"
      w="full"
    >
      <IconButton
        icon={<MenuIcon fontSize="2xl" />}
        variant="ghost"
        onClick={onOpen}
        position="fixed"
        size="sm"
        top="md"
        left="md"
        display={{ base: "none", lg: "flex" }}
      />
      <Drawer
        open={open}
        placement="left"
        size="sm"
        closeOnDrag
        closeOnOverlay
        withDragBar={false}
      >
        <DrawerOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px)"
          onClick={onClose}
        />
        <DrawerHeader>
          <IconButton
            icon={<XIcon fontSize="2xl" />}
            variant="ghost"
            onClick={onClose}
            size="sm"
          />
        </DrawerHeader>
        <DrawerBody px="0" my="0">
          <Suspense fallback={<SidebarSkeleton />}>
            <Sidebar channels={context.channels} user={context.user} />
          </Suspense>
        </DrawerBody>
      </Drawer>
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
