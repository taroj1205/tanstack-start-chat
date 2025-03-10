import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  Drawer,
  DrawerBody,
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
import { MenuIcon, XIcon } from "@yamada-ui/lucide";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/chat")({
  beforeLoad({ context }) {
    if (!context.user) throw redirect({ to: "/auth" });
  },
  loader: ({ context }) => context,
  component: () => <ChatLayout />,
  pendingComponent: () => (
    <Grid
      gridTemplateColumns={{ base: "auto 1fr", lg: "1fr" }}
      flexGrow={1}
      h="full"
      w="full"
    >
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
        variant="subtle"
        onClick={onOpen}
        position="fixed"
        size="sm"
        top="md"
        left="md"
        display={{ base: "none", lg: "flex" }}
        z={10}
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
          <Sidebar user={context.user} onClose={onClose} />
        </DrawerBody>
      </Drawer>
      <GridItem display={{ lg: "none" }}>
        <Sidebar user={context.user} onClose={onClose} />
      </GridItem>
      <GridItem flex={1}>
        <Outlet />
      </GridItem>
    </Grid>
  );
}
