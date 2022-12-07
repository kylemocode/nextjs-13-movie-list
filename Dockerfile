FROM node:16.14.0

WORKDIR /app

COPY package.json package-lock.json /app/
RUN yarn

COPY . .
ENV NODE_ENV=production
ENV BASE_URL=http://localhost:3000
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
RUN npx prisma generate
RUN yarn run build

CMD [ "yarn", "start" ]