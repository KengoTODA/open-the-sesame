FROM raspbian/jessie:041518
RUN apt-get update && apt-get install -y curl
# https://github.com/nodesource/distributions/blob/master/README.md#debinstall
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
# https://yarnpkg.com/lang/en/docs/install/#debian-stable
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && \
    apt-get dist-upgrade && \
    apt-get install -y pigpio nodejs git yarn && \
    apt-get clean

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn
COPY .env .env
COPY index.js index.js

CMD ["node", "index.js"]
