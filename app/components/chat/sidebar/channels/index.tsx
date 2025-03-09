import { FC, memo } from "react";
import { fetchChannels } from "~/utils/chat";
import { VStack, For } from "@yamada-ui/react";
import { ChannelItem } from "./channel-item";
import { Channel } from "@prisma/client";

export type ChannelsProps = {
  channels: Channel[];
  onClose: () => void;
};

export const Channels: FC<ChannelsProps> = memo(({ channels, onClose }) => {
  return (
    <VStack gap="0" p="md">
      <For each={channels}>
        {(channel) => (
          <ChannelItem key={channel.id} channel={channel} onClose={onClose} />
        )}
      </For>
    </VStack>
  );
});
