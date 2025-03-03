#!/bin/sh
set -e

# Generate Prisma client (ensures types are up to date)
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Seed the database
pnpm prisma db seed

# Build the application
pnpm run build

# Start the application
pnpm run start