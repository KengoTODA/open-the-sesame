# docker build --tag kengotoda/ots-app .

FROM node:10-alpine
EXPOSE 5000

COPY ./package.json package.json
COPY ./webpack.config.js webpack.config.js
COPY ./yarn.lock yarn.lock
RUN yarn
COPY ./src src
COPY index.js index.js
RUN yarn build

USER node
CMD ["node", "index.js"]
