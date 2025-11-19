# ---------------------------------------------------------
# Build stage
# ---------------------------------------------------------
FROM node:20-alpine AS builder

ARG PNPM_VERSION=10.22.0

RUN apk add --no-cache python3 make g++ \
    && corepack enable \
    && corepack prepare pnpm@${PNPM_VERSION} --activate

WORKDIR /app

# Copy lockfile and configs
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy only the package.json of api-gateway
RUN mkdir -p apps/api-gateway
COPY apps/api-gateway/package.json apps/api-gateway/

# Install monorepo dependencies (build)
RUN pnpm install --frozen-lockfile

# Copy all source code for the build
COPY . .

# Build
RUN pnpm -r run build

# ---------------------------------------------------------
# Runtime stage
# ---------------------------------------------------------
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the already-resolved node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps/api-gateway/node_modules ./apps/api-gateway/node_modules

# Copy only the api-gateway build
COPY --from=builder /app/apps/api-gateway/dist ./apps/api-gateway/dist

ENV NODE_ENV=production

CMD ["node", "apps/api-gateway/dist/main.js"]
