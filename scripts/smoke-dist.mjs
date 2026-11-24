import assert from 'node:assert/strict';
import Wsign, { Wsign as Named, Webhook, WsignError, VERSION } from '@wsign/node';

assert.equal(typeof Wsign, 'function');
assert.equal(Wsign, Named);
assert.equal(Wsign.Webhook, Webhook);
assert.equal(new Wsign('sk_test_0000').signatureRequests.constructor.name, 'SignatureRequests');
assert.ok(new Wsign.errors.AuthenticationError('x', { statusCode: 401 }) instanceof WsignError);
assert.match(VERSION, /^\d+\.\d+\.\d+/);
const header = Webhook.generateTestHeader({ payload: '{"id":"evt_1","object":"event"}', secret: 'whsec_x' });
assert.equal(Webhook.constructEvent('{"id":"evt_1","object":"event"}', header, 'whsec_x').id, 'evt_1');
console.log('ESM build OK');
