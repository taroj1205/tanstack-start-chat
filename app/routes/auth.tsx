import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import {
  Button,
  Center,
  VStack,
  Heading,
  Text,
  Box,
  Icon,
} from "@yamada-ui/react";
import { DiscordIcon } from "~/components/icons";
import { signIn } from "~/lib/client/auth";

export const Route = createFileRoute("/auth")({
  beforeLoad({ context }) {
    if (context.user) throw redirect({ to: "/chat" });
  },
  component: AuthComponent,
});

export function AuthComponent() {
  const handleClick = async () => {
    await signIn.social({ provider: "discord", callbackURL: "/chat" });
  };
  return (
    <Center as={VStack} h="100svh">
      <Heading fontSize="5xl" lineHeight={1}>
        Welcome to ChatConnect!
      </Heading>
      <Text>Sign in to start chatting</Text>
      <Button
        onClick={handleClick}
        size="lg"
        colorScheme="purple"
        startIcon={<DiscordIcon boxSize={5} />}
        w="fit-content"
      >
        Continue with Discord
      </Button>
    </Center>
  );
}
