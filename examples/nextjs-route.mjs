// Next.js App Router route handler: save as app/api/hooks/wsign/route.js (or route.ts).
// Read the body with request.text() so the exact bytes are verified.
import { Webhook } from '@wsign/node';

export async function POST(request) {
  const payload = await request.text();
  let event;
  try {
    event = Webhook.constructEvent(
      payload,
      request.headers.get('wsign-signature'),
      process.env.WSIGN_WEBHOOK_SECRET,
    );
  } catch (error) {
    return new Response(`signature check failed: ${error.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'signature_request.completed':
      // e.g. mark the order as signed using event.data.object.metadata
      break;
    case 'signer.declined':
      break;
    default:
      break;
  }
  return Response.json({ received: true });
}
