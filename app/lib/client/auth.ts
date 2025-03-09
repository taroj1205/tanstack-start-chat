import { createAuthClient } from "better-auth/react";
import { env } from "~/env";
const authClient = createAuthClient();

export const { signIn, signUp, useSession, getSession } = authClient;
