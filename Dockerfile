# syntax=docker/dockerfile:1

ARG NODE_VERSION=24-alpine

FROM node:${NODE_VERSION} AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable

WORKDIR /app

######################################################################
# Dependencies
######################################################################

FROM base AS deps

ENV NODE_ENV=development

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Use BuildKit cache for the pnpm store when available.
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

######################################################################
# Build
######################################################################

FROM base AS builder

ARG VERSION
ARG BUILD_DATE

ENV NODE_ENV=production
ENV NEXT_PUBLIC_FRONT_END_BUILD_VERSION="${VERSION}"
ENV NEXT_PUBLIC_FRONT_END_BUILD_DATE="${BUILD_DATE}"

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# If the project requires build-time environment defaults, keep this copy.
# Make sure .env.build does not contain secrets.
COPY .env.build .env

RUN pnpm build

######################################################################
# Runtime
######################################################################

FROM node:${NODE_VERSION} AS runner

ARG VERSION
ARG BUILD_DATE

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_PUBLIC_FRONT_END_BUILD_VERSION="${VERSION}"
ENV NEXT_PUBLIC_FRONT_END_BUILD_DATE="${BUILD_DATE}"
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# Next.js standalone output contains the minimal server and traced runtime files.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
