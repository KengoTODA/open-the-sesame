#!/usr/bin/env node

require("dotenv").config();
const Sentry = require("@sentry/node");
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: "pi"
});

const signale = require("signale");
signale.config({
  displayTimestamp: true,
  displayDate: true
});
signale.start("initializing app...");

const Gpio = require("pigpio").Gpio;
const relay = new Gpio(17, { mode: Gpio.OUTPUT });
relay.digitalWrite(0);

function wait(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
}

const Pusher = require("pusher-client");
const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: "ap3",
  forceTLS: true
});
const channel = pusher.subscribe("my-channel");
const SWITCH_ON = 1200;
const SWITCH_OFF = 1000;
var working = false;
channel.bind("my-event", async function(data) {
  if (working) return;

  working = true;
  try {
    signale.start("received an event...");
    relay.digitalWrite(1);
    await wait(1000);
    signale.complete("doors will be closed soon");
    relay.digitalWrite(0);
  } catch (e) {
    Sentry.captureException(e);
  } finally {
    working = false;
  }
});

// https://pusher.com/docs/channels/using_channels/connection
pusher.connection.bind("error", function(err) {
  if (err.error.data.code === 4004) {
    Sentry.captureException(err);
    signale.console.error("detected limit error");
  }
});
signale.success("app has been initialized");
