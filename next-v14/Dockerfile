FROM node:18 AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:18-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.next/standalone ./
COPY --from=builder  /app/.next/static ./.next/static
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production

ENV HOSTNAME "0.0.0.0"

EXPOSE 4000

ENV PORT 4000

CMD ["node", "server.js"]

