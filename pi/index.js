#!/usr/bin/env node

require("dotenv").config();
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
    console.log("start working...");
    relay.digitalWrite(1);
    await wait(1000);
    relay.digitalWrite(0);
  } finally {
    working = false;
    console.log("finished to work");
  }
});
