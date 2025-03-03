import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Check if any users exist
  const userCount = await prisma.user.count();

  if (userCount === 0) {
    // Create system user
    const systemUser = await prisma.user.create({
      data: {
        id: "system-user",
        name: "System",
        email: "system@example.com",
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    // Create default channels
    await prisma.channel.createMany({
      data: [
        {
          name: "General",
          description: "A place for team-wide communication",
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: systemUser.id,
        },
        {
          name: "Random",
          description: "Off-topic conversations and fun discussions",
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: systemUser.id,
        },
        {
          name: "Help",
          description: "Ask questions and get support from the team",
          createdAt: new Date(),
          updatedAt: new Date(),
          createdBy: systemUser.id,
        },
      ],
    });

    console.log("Default data initialized successfully");
  } else {
    console.log("Database already contains users, skipping initialization");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
