import { memo } from "react";
import { UIButtonLink } from "../../../tanstack/link";
import { HashIcon } from "@yamada-ui/lucide";
import { useParams } from "@tanstack/react-router";
import { Channel } from "@prisma/client";

export const ChannelItem = memo(
  ({ channel, onClose }: { channel: Channel; onClose: () => void }) => {
    const { chatid } = useParams({ from: "/chat/$chatid" });
    return (
      <UIButtonLink
        to={"/chat/$chatid"}
        params={{ chatid: channel.id }}
        textAlign="left"
        variant="ghost"
        justifyContent="start"
        startIcon={<HashIcon />}
        active={chatid === channel.id}
        _active={{
          bg: ["blackAlpha.200", "whiteAlpha.200"],
        }}
        onClick={onClose}
      >
        {channel.name}
      </UIButtonLink>
    );
  }
);

ChannelItem.displayName = "ChannelItem";
