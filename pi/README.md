# open-the-sesame pi

This app provides a daemon, that listens notification from [pusher.com](https://pusher.com/) and uses a relay to open door. It also uses [sentry.io](https://sentry.io/) to manage runtime errors.

We use Raspberry Pi 3 Model B. You also need a relay that supports 3.3V input.
Make sure that this relay get signal from a GPIO 17 (or others) on your raspberry pi.

## How to run as a daemon in Raspberry Pi

1. Install `node.js` v10 and `yarn`
2. Clone this Git repo under home directory (`/home/pi` by default)
3. Run following commands in this `pi` directory:

```sh
$ yarn
$ sudo ln -s open-the-sesame.service /etc/systemd/system/
$ sudo systemctl daemon-reload
$ sudo systemctl enable open-the-sesame.service
$ sudo systemctl start open-the-sesame.service
```

## Configuration

Write down all necessary configuration into .env file in the project root directory:

```properties
# configuration for pusher.com, visit its dashboard to get actual values
PUSHER_APP_ID=123456
PUSHER_APP_KEY=app-key
PUSHER_APP_SECRET=something-secret

# Sentry DSN (Data Source Name) to submit log records
SENTRY_DSN=https://<key>@sentry.io/<project>
```

## How to check log

```sh
$ sudo journalctl --follow -u open-the-sesame.service
```
