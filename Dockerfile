FROM node:16-slim

WORKDIR /app

COPY package.json package-lock.json /app/
RUN apt-get update
RUN apt-get install -y openssl
RUN yarn

COPY . .
ENV NODE_ENV=production
ENV BASE_URL=http://localhost:3000
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
RUN npx prisma generate
RUN yarn run build

CMD [ "yarn", "start" ]