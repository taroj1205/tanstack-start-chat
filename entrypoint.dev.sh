#!/bin/sh
set -e

# Generate Prisma client (ensures types are up to date)
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev --name init

# Build the application
pnpm run dev