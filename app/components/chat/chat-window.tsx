import {
  For,
  VStack,
  InfiniteScrollArea,
  ScrollArea,
  Heading,
  Box,
  Center,
  Text,
} from "@yamada-ui/react";
import { memo, useEffect, useRef } from "react";
import { ChatItem, ChatItemSkeleton } from "./chat-item";
import { User } from "better-auth";
import { ChannelWithMessages } from "~/utils/chat";
import { BottomToolbarSkeleton } from "./bottom-toolbar";
import { HashIcon } from "@yamada-ui/lucide";

interface ChatWindowProps {
  channel: ChannelWithMessages;
  loading: boolean;
}

export const ChatWindow = memo(({ channel, loading }: ChatWindowProps) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const prevChannelMessagesLength = useRef(channel.messages.length);
  const scrolledToBottom = useRef(false);

  useEffect(() => {
    if (
      prevChannelMessagesLength.current !== channel.messages.length &&
      scrollAreaRef.current &&
      scrolledToBottom.current
    ) {
      console.log("scroll to bottom");
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });

      prevChannelMessagesLength.current = channel.messages.length;
    }
  }, [channel.messages]);

  const handleScroll = () => {
    if (scrollAreaRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        console.log("scrolled to bottom");
        scrolledToBottom.current = true;
      } else {
        scrolledToBottom.current = false;
      }
    }
  };

  return (
    <InfiniteScrollArea
      ref={scrollAreaRef}
      as={ScrollArea}
      p="0"
      h="full"
      gap="0"
      loading={loading}
      maxH="calc(100svh - 56px)"
      onScroll={handleScroll}
    >
      <VStack p="md">
        <Center
          bg={["blackAlpha.200", "whiteAlpha.200"]}
          w="fit-content"
          p="md"
          borderRadius="full"
        >
          <HashIcon fontSize="5xl" />
        </Center>
        <Heading as="h2" fontSize="3xl">
          Welcome to {channel.name}!
        </Heading>
        <Text>This is the start of {channel.name} channel.</Text>
      </VStack>
      <VStack gap="0">
        <For each={channel.messages}>
          {(message) => (
            <ChatItem
              key={message.id}
              message={message}
              // isCurrentUser={message.userId === mockUsers[0].id}
            />
          )}
        </For>
      </VStack>
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
