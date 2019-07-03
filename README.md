# Open The Sesame

A system that opens a door from out of home:

1. In a web app, user clicks a button to trigger [pusher.com](pusher.com)'s server API
2. In a Raspberry Pi 3, a service receives a message by [pusher.com](pusher.com)'s client API
3. Use [pigpio](https://github.com/fivdi/pigpio) to control a relay
4. Relay toggles the electric switch to open a door

