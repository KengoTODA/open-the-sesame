FROM node:10-alpine
EXPOSE 5000

COPY . .
RUN yarn install && yarn build
CMD ["node", "index.js"]

USER node

# To run a server on docker, simply run the following command:
# $ docker run -d --restart always -p 80:5000 $(docker build -q .)
