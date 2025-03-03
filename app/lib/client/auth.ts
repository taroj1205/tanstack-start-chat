import { createAuthClient } from "better-auth/react";
import { env } from "~/env";
const authClient = createAuthClient({
  baseURL: env.BASE_URL, // the base url of your auth server
});

export const { signIn, signUp, useSession, getSession } = authClient;
