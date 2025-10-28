FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

FROM node:20-alpine AS runner

ARG APP_USER=appuser
ARG APP_GROUP=appgroup
ARG DEFAULT_PORT=3000

ENV NODE_ENV=production
ENV PORT=${DEFAULT_PORT}

WORKDIR /app

# Create non-root user and group
RUN addgroup -S ${APP_GROUP} \
 && adduser -S -G ${APP_GROUP} ${APP_USER}

 # Ensure non-root user owns the app files
COPY --from=builder --chown=${APP_USER}:${APP_GROUP} /app ./

RUN npm prune --omit=dev

USER ${APP_USER}

EXPOSE ${PORT}

CMD ["node", "index.js"]
