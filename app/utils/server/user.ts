import { createServerFn } from "@tanstack/start";
import { z } from "zod";
import { prisma } from "~/lib/server/prisma";

// Validation schema for getting user info
const UserInfoSchema = z.object({
  userId: z.string(),
});

// Get user info server function
export const getUserInfo = createServerFn({ method: "GET" })
  .validator(UserInfoSchema)
  .handler(async ({ data }) => {
    const { userId } = data;

    // Fetch user with selected fields to exclude sensitive information
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        // Add any other non-sensitive fields you want to expose
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  });

// Get multiple users server function
export const getUsers = createServerFn({ method: "GET" }).handler(async () => {
  // Fetch users with selected fields to exclude sensitive information
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
});
