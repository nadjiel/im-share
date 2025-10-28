FROM node:20-alpine

ARG APP_USER=appuser
ARG APP_GROUP=appgroup
ARG APP_UID=1000
ARG APP_GID=1000
ARG DEFAULT_PORT=3000

ENV NODE_ENV=production
ENV PORT=${DEFAULT_PORT}

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit-dev

COPY . .

# Create non-root user and group
RUN addgroup -g ${APP_GID} -S ${APP_GROUP} \
 && adduser -u ${APP_UID} -S -G ${APP_GROUP} ${APP_USER}

COPY --from=builder /app ./

# Ensure non-root user owns the app files
RUN chown -R ${APP_USER}:${APP_GROUP} /app

USER ${APP_USER}

EXPOSE ${PORT}

CMD ["node", "index.js"]
