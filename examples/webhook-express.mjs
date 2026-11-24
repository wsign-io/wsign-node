// Express receiver (npm i express). express.raw keeps the body as a Buffer, which the signature needs;
// do not mount express.json() before this route.
import express from 'express';
import Wsign from '@wsign/node';

const wt = new Wsign(process.env.WSIGN_API_KEY);
const app = express();

app.post('/hooks/wsign', express.raw({ type: 'application/json' }), (req, res) => {
  let event;
  try {
    event = wt.webhooks.constructEvent(
      req.body,
      req.headers['wsign-signature'],
      process.env.WSIGN_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send(`signature check failed: ${err.message}`);
  }
  if (event.type === 'signature_request.completed') {
    const sr = event.data.object;
    console.log('completed', sr.id, sr.reference);
  }
  res.json({ received: true });
});

app.listen(3000);
