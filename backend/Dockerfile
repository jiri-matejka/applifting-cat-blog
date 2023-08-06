FROM node:18 as builder

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build2

# ---------------------------------------------
FROM node:18-slim

WORKDIR /app

COPY --from=builder /app/dist ./dist

COPY package.json .
COPY yarn.lock .
COPY env/production.env ./env/production.env

RUN yarn install --frozen-lockfile --production

EXPOSE 3000

CMD [ "node", "-r",  "module-alias/register", "./dist", "--env=production" ]