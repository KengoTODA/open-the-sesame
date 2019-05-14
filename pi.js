require('dotenv').config();
const Gpio = require('pigpio').Gpio;
const motor = new Gpio(10, {mode: Gpio.OUTPUT});

function write(pulseWidth) {
  motor.servoWrite(pulseWidth);
  return Promise.resolve();
}
function wait(value) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(value);
    }, 1000);
  });
}

const Pusher = require('pusher-client');
const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
  cluster: 'ap3',
  forceTLS: true
});
const channel = pusher.subscribe('my-channel');
const SWITCH_ON  = 1200;
const SWITCH_OFF = 1000;
var working = false;
channel.bind('my-event', async function(data) {
  if (working) return;

  working = true;
  try {
    console.log('start working...');
    await write(SWITCH_ON);
    await wait();
    await write(SWITCH_OFF);
    await wait();
  } finally {
    working = false;
    console.log('finished to work');
  }
});

write(SWITCH_OFF);
