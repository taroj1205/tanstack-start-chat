import {
  For,
  VStack,
  InfiniteScrollArea,
  ScrollArea,
  Heading,
  Center,
  Text,
  Grid,
  GridItem,
} from "@yamada-ui/react";
import { memo, useEffect, useRef, useState } from "react";
import { ChatItem, ChatItemSkeleton } from "./chat-item";
import { BottomToolbarSkeleton } from "./bottom-toolbar";
import { HashIcon } from "@yamada-ui/lucide";
import { Channel } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getChannelMessages } from "~/utils/server/chat";
import { NotFound } from "../not-found";
import { MessageWithUser } from "~/utils/chat";

interface ChatWindowProps {
  channel: Channel;
  messages: MessageWithUser[] | null;
}

export const ChatWindow = memo(({ channel, messages }: ChatWindowProps) => {
  if (!channel) return <NotFound>Channel not found</NotFound>;

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const scrolledToBottom = useRef(true);

  const { data: currentChannelMessages, isLoading } = useQuery<
    MessageWithUser[]
  >({
    queryKey: ["messages", channel.id],
    queryFn: () =>
      getChannelMessages({
        data: channel.id,
      }),
    initialData: messages || [],
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    placeholderData: keepPreviousData,
  });

  const prevChannelMessagesLength = useRef(currentChannelMessages?.length || 0);

  useEffect(() => {
    if (
      prevChannelMessagesLength.current !==
        (currentChannelMessages?.length || 0) &&
      scrollAreaRef.current &&
      scrolledToBottom.current
    ) {
      console.log("scroll to bottom");
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });

      prevChannelMessagesLength.current = currentChannelMessages?.length || 0;
    }
  }, [currentChannelMessages]);

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
      maxH="calc(100svh - 56px)"
      loading={isLoading}
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
        <For each={currentChannelMessages || []}>
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
    <Grid gridTemplateRows="1fr auto" h="full" bg="blackAlpha.100">
      <GridItem as={VStack} bg="blackAlpha.100" p="0" gap="0">
        <ScrollArea h="full" maxH="calc(100vh - 56px)">
          <For each={Array.from({ length: 10 })}>
            {(_, index) => <ChatItemSkeleton key={index} />}
          </For>
        </ScrollArea>
        <BottomToolbarSkeleton />
      </GridItem>
    </Grid>
  );
});

ChatWindowSkeleton.displayName = "ChatWindowSkeleton";
