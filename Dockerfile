FROM node:20-alpine

ARG APP_USER=appuser
ARG APP_GROUP=appgroup
ARG DEFAULT_PORT=3000

ENV NODE_ENV=production
ENV PORT=${DEFAULT_PORT}

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit-dev

COPY . .

# Create non-root user and group
RUN addgroup -S ${APP_GROUP} \
 && adduser -S -G ${APP_GROUP} ${APP_USER}

# Ensure non-root user owns the app files
RUN chown -R ${APP_USER}:${APP_GROUP} /app

USER ${APP_USER}

EXPOSE ${PORT}

CMD ["node", "index.js"]
