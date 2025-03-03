# Use an official Node runtime as the base image
FROM node:20-alpine

# Install PostgreSQL client tools and network debugging utilities
RUN apk add --no-cache postgresql-client postgresql-dev netcat-openbsd bind-tools

# Set working directory in the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml (or package-lock.json)
COPY package*.json pnpm-lock.yaml* ./

# Install pnpm
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Copy entrypoint script
COPY entrypoint.sh /entrypoint.sh
COPY entrypoint.dev.sh /entrypoint.dev.sh

# Make entrypoint scripts executable
RUN chmod +x /entrypoint.sh
RUN chmod +x /entrypoint.dev.sh

# Expose the port the app runs on
EXPOSE 3000

# Set the entrypoint
CMD ["sh", "-c", "if [ -n \"$COMPOSE_WATCH\" ]; then /entrypoint.dev.sh; else /entrypoint.sh; fi"]
