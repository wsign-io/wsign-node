'use strict';
const assert = require('node:assert/strict');
const pkg = require('@wsign/node');

const { Wsign, Webhook, WsignError, VERSION } = pkg;
assert.equal(typeof Wsign, 'function');
assert.equal(pkg.default, Wsign);
assert.equal(Wsign.Webhook, Webhook);
assert.ok(new Wsign.errors.AuthenticationError('x', { statusCode: 401 }) instanceof WsignError);
assert.equal(new Wsign('sk_test_0000').isTestMode(), true);
assert.match(VERSION, /^\d+\.\d+\.\d+/);
const header = Webhook.generateTestHeader({ payload: '{"id":"evt_1","object":"event"}', secret: 'whsec_x' });
assert.equal(Webhook.constructEvent('{"id":"evt_1","object":"event"}', header, 'whsec_x').id, 'evt_1');
console.log('CommonJS build OK');
