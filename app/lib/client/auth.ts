import { createAuthClient } from "better-auth/react";
import { env } from "~/env";
const authClient = createAuthClient({
  baseURL: import.meta.env.PROD
    ? "https://chat.poyo.jp"
    : "http://localhost:3000", // the base url of your auth server
  trustedOrigins: ["https://chat.poyo.jp"]
});

export const { signIn, signUp, useSession, getSession } = authClient;
