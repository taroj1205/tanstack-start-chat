import {
  ErrorComponent,
  Await,
  ErrorComponentProps,
} from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Grid, ScrollArea } from "@yamada-ui/react";
import { ChatWindow, ChatWindowSkeleton } from "~/components/chat";
import {
  BottomToolbar,
  BottomToolbarSkeleton,
} from "~/components/chat/bottom-toolbar";
import { NotFound } from "~/components/not-found";
import { getChannel, getChannelMessages } from "~/utils/server/chat";
import { AuthComponent } from "./auth";
import { Suspense, useRef } from "react";

export const Route = createFileRoute("/chat/$chatid")({
  loader: async ({ context, params: { chatid } }) => {
    const channel = await getChannel({ data: chatid });

    if (!channel) {
      throw new Error("Channel not found");
    }

    return {
      user: context.user,
      channel: channel,
      messages: channel
        ? getChannelMessages({ data: channel.id })
        : Promise.resolve(null),
      queryClient: context.queryClient,
    };
  },
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

  if (!data || !data.channel) return <NotFound>Channel not found</NotFound>;

  const refreshMessages = async () => {
    // const channel = await data.channel;
    // if (channel) {
    //   const queryClient = useQueryClient();
    //   queryClient.invalidateQueries({
    //     queryKey: ["messages", channel.id],
    //   });
    // }
  };

  return (
    <Grid gridTemplateRows="1fr auto" h="full" bg="blackAlpha.100">
      <Suspense fallback={<ChatWindowSkeleton />}>
        <ScrollArea>
          <Await
            promise={data.messages}
            children={(messages) => (
              <ChatWindow channel={data.channel} messages={messages} />
            )}
          />
        </ScrollArea>
      </Suspense>
      <Suspense fallback={<BottomToolbarSkeleton />}>
        <BottomToolbar
          channel={data.channel}
          user={data.user}
          onMessageSent={refreshMessages}
        />
      </Suspense>
    </Grid>
  );
}
