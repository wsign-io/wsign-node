import type { RequestOptions } from '../core/requestor.js';
import type { WsignResponse } from '../core/response.js';
import { buildPath } from '../core/util.js';
import type { IdentityVerification } from '../types.js';
import { ApiResource } from './base.js';

/** Identity verification records of signers (`idv_…`). */
export class IdentityVerifications extends ApiResource {
  async retrieve(id: string, options?: RequestOptions): Promise<WsignResponse<IdentityVerification>> {
    return this.requestor.json<IdentityVerification>(
      'GET',
      buildPath`/identity_verifications/${id}`,
      undefined,
      options,
    );
  }
}
