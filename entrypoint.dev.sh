#!/bin/sh
set -e

# Generate Prisma client (ensures types are up to date)
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev --name init

# Seed the database
pnpm prisma db seed

# Build the application
pnpm run dev