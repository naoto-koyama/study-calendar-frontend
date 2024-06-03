FROM node:20 AS appbuild
ARG NEXT_PUBLIC_NODE_ENV

WORKDIR /usr/src/app

COPY ./ ./

RUN touch .env.production
RUN echo "NEXT_PUBLIC_NODE_ENV=$NEXT_PUBLIC_NODE_ENV" >> .env.production
RUN cat .env.production

RUN corepack enable
RUN corepack prepare yarn@3.6.4 --activate

RUN yarn

RUN yarn build

FROM node:20-alpine

WORKDIR /usr/src/app
COPY --from=appbuild /usr/src/app/node_modules ./node_modules
COPY --from=appbuild /usr/src/app/public ./public
COPY --from=appbuild /usr/src/app/.next ./.next
COPY --from=appbuild /usr/src/app/next.config.js ./
COPY --from=appbuild /usr/src/app/package.json ./

EXPOSE 3000

# cmd for override
CMD ["yarn", "start"]
