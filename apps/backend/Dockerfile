FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# All deps stage
FROM base AS deps
WORKDIR /Users/raphaelalarcon/WebstormProjects/rythmix
ADD package.json pnpm-lock.yaml ./
RUN pnpm ci

# Production only deps stage
FROM base AS production-deps
WORKDIR /Users/raphaelalarcon/WebstormProjects/rythmix
ADD package.json pnpm-lock.yaml ./
RUN pnpm i --frozen-lockfile --prod

# Build stage
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules /app/node_modules
ADD . .
RUN node ace build

# Production stage
FROM base
ENV NODE_ENV=production
WORKDIR /app
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
EXPOSE 8080
CMD ["node", "./bin/server.js"]
