# Open The Sesame

A system that opens a door from out of home:

1. In a web app, user clicks a button to trigger [pusher.com](pusher.com)'s server API
2. In a Raspberry Pi 3, a service receives a message by [pusher.com](pusher.com)'s client API
3. Use [pigpio](https://github.com/fivdi/pigpio) to control a relay
4. Relay toggles the electric switch to open a door

## How to run client on Raspberry Pi

We use Raspberry Pi 3 Model B. You also need a relay that supports 3.3V input.
Make sure that this relay get signal from a GPIO 17 (or others) on your raspberry pi.

Move to `pi` directory then run `install.sh` with a proper `SSH_PASSWORD` for `pi` user.
It will install and run the open-the-sesame daemon remotely.

## How to check log from client

```sh
$ sudo journalctl --follow -u open-the-sesame.service
```
