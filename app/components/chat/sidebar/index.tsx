import {
  For,
  Grid,
  HStack,
  VStack,
  type GridProps,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Button,
} from "@yamada-ui/react";
import { FC, memo, Suspense } from "react";
import { UserComponent } from "./toolbar";
import { Channels } from "./channels";
import { Channel } from "@prisma/client";
import { signIn, useSession } from "~/lib/client/auth";
import { User } from "better-auth";

export interface SidebarProps {
  channels: Channel[];
  user?: User;
}

export const Sidebar: FC<GridProps & SidebarProps> = memo(
  ({ channels, user, ...props }) => {
    return (
      <Grid
        gridTemplateRows="1fr auto"
        w={{ base: "sm", lg: "sm" }}
        h="full"
        {...props}
      >
        <Suspense>
          <Channels channels={channels} />
        </Suspense>
        <HStack bg="blackAlpha.100" p="sm">
          <Suspense>
            {user ? (
              <UserComponent
                user={user}
                text={user.name}
                indicator
                avatarProps={{ size: "sm" }}
                userProps={{ fontSize: "sm" }}
              />
            ) : (
              <Button onClick={() => signIn.social({ provider: "discord" })}>
                Sign in
              </Button>
            )}
          </Suspense>
        </HStack>
      </Grid>
    );
  }
);

Sidebar.displayName = "Sidebar";

export const SidebarSkeleton = memo(() => {
  return (
    <Grid gridTemplateRows="1fr auto" w="sm" h="full">
      <VStack gap="0" p="md">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} h="10" w="full" mb="2" />
        ))}
      </VStack>
      <HStack bg="blackAlpha.300" p="sm">
        <SkeletonCircle size="8" />
        <SkeletonText lineClamp={1} w="60%" />
      </HStack>
    </Grid>
  );
});

SidebarSkeleton.displayName = "SidebarSkeleton";
