import { For, VStack, InfiniteScrollArea, ScrollArea } from "@yamada-ui/react";
import { memo } from "react";
import { ChatItem, ChatItemSkeleton } from "./chat-item";
import { User } from "better-auth";
import { ChannelWithMessages } from "~/utils/chat";
import { BottomToolbarSkeleton } from "./bottom-toolbar";

interface ChatWindowProps {
  channel: ChannelWithMessages;
  loading: boolean;
}

export const ChatWindow = memo(({ channel, loading }: ChatWindowProps) => {
  return (
    <InfiniteScrollArea
      as={VStack}
      p="0"
      h="full"
      gap="0"
      reverse
      loading={loading}
      maxH="calc(100svh - 56px)"
    >
      <For each={channel.messages}>
        {(message) => (
          <ChatItem
            key={message.id}
            message={message}
            // isCurrentUser={message.userId === mockUsers[0].id}
          />
        )}
      </For>
    </InfiniteScrollArea>
  );
});

ChatWindow.displayName = "ChatWindow";

export const ChatWindowSkeleton = memo(() => {
  return (
    <VStack bg="blackAlpha.100" p="0" gap="0">
      <ScrollArea h="full" maxH="calc(100vh - 56px)">
        <For each={Array.from({ length: 10 })}>
          {(_, index) => <ChatItemSkeleton key={index} />}
        </For>
      </ScrollArea>
      <BottomToolbarSkeleton />
    </VStack>
  );
});

ChatWindowSkeleton.displayName = "ChatWindowSkeleton";
