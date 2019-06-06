const express = require('express');
const path = require('path')
const Pusher = require('pusher');
require('dotenv').config();

const PORT = process.env.PORT || 5000;
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: 'ap3',
  useTLS: true
});

express()
  .use(express.static(path.join(__dirname, 'public')))
  .post('/open', (req, res) => {
    pusher.trigger('my-channel', 'my-event', {
      'message': 'Open the Sesame'
    });
    res.status(200).send({
      result: 'done'
    });
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
