import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { env } from "../../env";
import { anonymous } from "better-auth/plugins";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseUrl: env.BASE_URL,
  socialProviders: {
    discord: {
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    },
  },
  trustedOrigins: [
    env.BASE_URL,
    "http://localhost:3000",
    "https://chat.poyo.jp",
  ],
  plugins: [anonymous()],
});
