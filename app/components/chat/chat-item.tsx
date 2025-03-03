import {
  Text,
  Avatar,
  VStack,
  HStack,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Grid,
  GridProps,
} from "@yamada-ui/react";
import { FC, memo } from "react";
import { MessageWithUser } from "~/utils/chat";

interface ChatItemProps {
  message: MessageWithUser;
}

export const ChatItem: FC<GridProps & ChatItemProps> = memo(
  ({ message, ...props }) => {
    return (
      <Grid
        gridTemplateColumns="auto 1fr"
        gap="sm"
        w="full"
        _hover={{ bg: ["blackAlpha.200", "blackAlpha.900"] }}
        transitionDuration="normal"
        p="md"
        {...props}
      >
        <Avatar
          name={message.user.name}
          src={message.user.image ?? undefined}
        />
        <VStack gap="sm">
          <HStack gap="sm" alignItems="flex-end" lineHeight="1">
            <Text fontWeight="semibold">{message.user.name}</Text>
            <Text fontSize="xs" color="muted">
              {new Date(message.updatedAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </HStack>
          <Text>{message.content}</Text>
        </VStack>
      </Grid>
    );
  }
);

ChatItem.displayName = "ChatItem";

export const ChatItemSkeleton = memo(() => {
  return (
    <Grid
      gridTemplateColumns="auto 1fr"
      gap="sm"
      lineHeight="1"
      w="full"
      _hover={{ bg: "blackAlpha.200" }}
      transitionDuration="normal"
      p="md"
    >
      <SkeletonCircle size="10" />
      <VStack gap="sm" alignItems="flex-start">
        <HStack gap="sm" alignItems="flex-end">
          <Skeleton w="100px" h="20px" />
          <Skeleton w="40px" h="16px" />
        </HStack>
        <SkeletonText lineClamp={2} w="full" />
      </VStack>
    </Grid>
  );
});

ChatItemSkeleton.displayName = "ChatItemSkeleton";
