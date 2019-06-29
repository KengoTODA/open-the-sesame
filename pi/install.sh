#!/usr/bin/env bash

# ===================================================
# Make sure you've installed yarn and node in advance
# ===================================================

DIR_NAME=open-the-sesame

ssh pi:${SSH_PASSWORD:-raspberry}@raspberrypi mkdir $DIR_NAME
scp package.json pi:${SSH_PASSWORD:-raspberry}@raspberrypi:$DIR_NAME/
scp index.js pi:${SSH_PASSWORD:-raspberry}@raspberrypi:$DIR_NAME/
scp open-the-sesame.service pi:${SSH_PASSWORD:-raspberry}@raspberrypi:$DIR_NAME/

ssh pi:$SSH_PASSWORD@raspberrypi chmod +x $DIR_NAME/index.js
ssh pi:$SSH_PASSWORD@raspberrypi sudo mv $DIR_NAME/open-the-sesame.service /etc/systemd/system/

ssh pi:$SSH_PASSWORD@raspberrypi yarn install
ssh pi:$SSH_PASSWORD@raspberrypi sudo systemctl daemon-reload
ssh pi:$SSH_PASSWORD@raspberrypi sudo systemctl enable open-the-sesame.service
ssh pi:$SSH_PASSWORD@raspberrypi sudo systemctl start open-the-sesame.service
