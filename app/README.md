# open-the-sesame app

This app provides web page with a form, and server that pushes notification to Raspberry Pi via [pusher.com](https://pusher.com/). It also uses [sentry.io](https://sentry.io/) to manage runtime errors.

## How to run in server

1. Install latest `docker` and `docker-compose`
2. Clone this Git repo under home directory
3. Put `.env` file to the project root directory
4. Run `docker-compose up -d --no-build` in this `app` directory to run product

## Continuous Deployment

When changes are merged and pushed to `master` branch, [Docker Hub](https://hub.docker.com/) will build and push docker images to [kengotoda/ots-nginx](https://hub.docker.com/r/kengotoda/ots-nginx) and [kengotoda/ots-app](https://hub.docker.com/r/kengotoda/ots-app).

Then the running containers in server will be updated by [ouroboros](https://github.com/pyouroboros/ouroboros/) automatically.

## Configuration

Write down all necessary configuration into `.env` file in the project root directory:

```properties
# configuration for pusher.com, visit its dashboard to get actual values
PUSHER_APP_ID=123456
PUSHER_APP_KEY=app-key
PUSHER_APP_SECRET=something-secret

# Sentry DSN (Data Source Name) to submit log records
SENTRY_DSN=https://<key>@sentry.io/<project>

# The domain to host this app
APP_DOMAIN=example.com
```

Make sure all values are NOT wrapped by double quarts; `docker-compose` does not remove double-quart during parsing even though `dotenv` module does.
