import { createFileRoute, redirect } from "@tanstack/react-router";
import { Button, Center } from "@yamada-ui/react";
import { signIn, useSession } from "~/lib/client/auth";

export const Route = createFileRoute("/auth")({
  beforeLoad({ context }) {
    if (context.user) throw redirect({ to: "/chat" });
  },
  component: AuthComponent,
});

export function AuthComponent() {
  const handleClick = async () => {
    await signIn.social({ provider: "discord" });
  };
  return (
    <Center h="100svh">
      <Button onClick={handleClick}>Sign in</Button>
    </Center>
  );
}
