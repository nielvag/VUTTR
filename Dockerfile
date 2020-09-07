FROM node:alpine

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json yarn.lock ./

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "yarn", "sequelize db:migrate" ]
