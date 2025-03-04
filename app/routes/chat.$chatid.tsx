import { ErrorComponent, Navigate, notFound } from "@tanstack/react-router";
import { ErrorComponentProps, useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import {
  Grid,
  Textarea,
  HStack,
  IconButton,
  Container,
  Button,
  Text,
  ScrollArea,
  Center,
} from "@yamada-ui/react";
import { ChatWindow, ChatWindowSkeleton } from "~/components/chat";
import { BottomToolbar } from "~/components/chat/bottom-toolbar";
import { NotFound } from "~/components/not-found";
import { getSession, signIn, useSession } from "~/lib/client/auth";
import { fetchChannel } from "~/utils/chat";
import { useQuery } from "@tanstack/react-query";
import { getChannelMessages } from "~/utils/server/chat";
import { AuthComponent } from "./auth";
import { Suspense } from "react";
import { redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/chat/$chatid")({
  beforeLoad: async ({ params: { chatid } }) => {
    const channel = await fetchChannel({ data: chatid });
    return { channel };
  },
  loader: ({ context }) => context,
  errorComponent: ChannelErrorComponent,
  component: RouteComponent,
  notFoundComponent: () => {
    return <NotFound>Channel not found</NotFound>;
  },
  pendingComponent: () => <ChatWindowSkeleton />,
});

function ChannelErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function RouteComponent() {
  const data = Route.useLoaderData();

  if (!data.user) return <AuthComponent />;

  if (!data || !data.channel || !data.channel.id || !data.channel.name)
    return <NotFound>Channel not found</NotFound>;

  const channel = data.channel;

  if (!channel) return <NotFound>Channel not found</NotFound>;

  const {
    data: messages,
    refetch,
    isPending,
    isLoading,
  } = useQuery({
    queryKey: [`channel-messages-${channel.id}`],
    queryFn: () =>
      getChannelMessages({
        data: channel.id,
      }),
    refetchInterval: 3000, // Poll every 3 seconds
  });

  return (
    <Grid gridTemplateRows="1fr auto" h="full" bg="blackAlpha.100">
      <Suspense fallback={<ChatWindowSkeleton />}>
        <ScrollArea>
          <ChatWindow
            channel={{ ...channel, messages: messages || [] }}
            loading={isPending || isLoading}
          />
        </ScrollArea>
        <BottomToolbar
          channel={channel}
          user={data.user}
          onMessageSent={() => refetch()}
        />
      </Suspense>
    </Grid>
  );
}
