import { FC, memo, useState, KeyboardEvent } from "react";
import {
  HStack,
  Textarea,
  IconButton,
  Grid,
  useBoolean,
  isString,
} from "@yamada-ui/react";
import { SendIcon } from "@yamada-ui/lucide";
import { ChatItem } from "../chat-item";
import { Channel, Message } from "@prisma/client";
import { User } from "better-auth";
import { sendMessage } from "~/utils/server/chat";
import { MessageWithUser } from "~/utils/chat";
import { useMutation } from "@tanstack/react-query";

export type BottomToolbarProps = {
  channel: Channel;
  user: User;
  onMessageSent?: () => void;
};

export const BottomToolbar: FC<BottomToolbarProps> = memo(
  ({ channel, user, onMessageSent }) => {
    const [message, setMessage] = useState("");
    const [previewMessage, setPreviewMessage] =
      useState<MessageWithUser | null>(null);
    const [isSending, { on: startSending, off: stopSending }] = useBoolean();

    const sendMessageMutation = useMutation<
      Message,
      Error,
      { data: { channelId: string; userId: string; content: string } }
    >({
      mutationFn: async (variables) => {
        return await sendMessage(variables);
      },
      onMutate: async (variables) => {
        startSending();
        setPreviewMessage({
          id: "preview",
          content: variables.data.content,
          userId: user.id,
          createdAt: new Date(),
          channelId: channel.id,
          updatedAt: new Date(),
          user: {
            id: user.id,
            name: user.name,
            image: isString(user.image) ? user.image : null,
            createdAt: user.createdAt || new Date(),
            updatedAt: user.updatedAt || new Date(),
            channelId: null,
            email: user.email || "",
            emailVerified: user.emailVerified || false,
            isAnonymous: false,
          },
        });
        setMessage("");
      },
      onError: (error, variables) => {
        console.error("Failed to send message", error);
        setMessage(variables.data.content);
      },
      onSettled: () => {
        stopSending();
        onMessageSent?.();
      },
    });

    const handleSend = async () => {
      if (!message.trim()) return;

      sendMessageMutation.mutate({
        data: {
          channelId: channel.id,
          userId: user.id,
          content: message,
        },
      });
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (!e.shiftKey && e.key === "Enter") {
        handleSend();
        e.preventDefault();
      }
    };

    return (
      <Grid gridTemplateRows="auto auto" gap="0">
        {isSending && previewMessage && (
          <ChatItem message={previewMessage} opacity={isSending ? 0.3 : 0.5} />
        )}
        <HStack p="sm" gap="sm">
          <Textarea
            autosize
            maxRows={8}
            rows={1}
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <IconButton
            colorScheme="primary"
            placeSelf="end"
            onClick={handleSend}
          >
            <SendIcon />
          </IconButton>
        </HStack>
      </Grid>
    );
  }
);

BottomToolbar.displayName = "BottomToolbar";

export const BottomToolbarSkeleton = memo(() => {
  return (
    <HStack p="sm" gap="sm">
      <Textarea autosize maxRows={8} rows={1} placeholder="Type a message" />
      <IconButton colorScheme="primary" placeSelf="end">
        <SendIcon />
      </IconButton>
    </HStack>
  );
});

BottomToolbarSkeleton.displayName = "BottomToolbarSkeleton";
