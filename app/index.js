require("dotenv").config();
const Sentry = require("@sentry/node");
Sentry.init({ dsn: process.env.SENTRY_DSN });
const signale = require("signale");
signale.start("initializing app...");

const express = require("express");
const compression = require("compression");
const path = require("path");
const Pusher = require("pusher");

const PORT = process.env.PORT || 5000;
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: "ap3",
  useTLS: true
});

express()
  .use(compression())
  .use(express.static(path.join(__dirname, "public")))
  .post("/open", (req, res) => {
    pusher.trigger(
      "my-channel",
      "my-event",
      {
        message: "Open the Sesame"
      },
      err => {
        if (err) {
          signale.warn(err);
          res.status(500).send({
            result: "error",
            err
          });
        } else {
          res.status(200).send({
            result: "done"
          });
        }
      }
    );
  })
  .listen(PORT, () => signale.success(`Listening on ${PORT}`));
