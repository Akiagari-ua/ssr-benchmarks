FROM node:21-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install
COPY . .

RUN yarn build

FROM node:21-alpine as runner

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV HOSTNAME "0.0.0.0"

EXPOSE 4040

ENV PORT 4040

CMD ["yarn", "start"]
