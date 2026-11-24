import type { AutoPager, PagePromise } from '../core/pagination.js';
import type { RequestOptions } from '../core/requestor.js';
import type { WsignResponse } from '../core/response.js';
import { buildPath } from '../core/util.js';
import type { EventListParams, EventRedeliverParams, EventRedelivery, WsignEvent } from '../types.js';
import { ApiResource, paramsObject } from './base.js';

/** Webhook events of the account (newest first). */
export class Events extends ApiResource {
  async retrieve(id: string, options?: RequestOptions): Promise<WsignResponse<WsignEvent>> {
    return this.requestor.json<WsignEvent>('GET', buildPath`/events/${id}`, undefined, options);
  }

  /** One page of events (`await`), or every event (`for await`). */
  list(params?: EventListParams, options?: RequestOptions): PagePromise<WsignEvent> {
    return this.listPage<WsignEvent>('/events', params, options);
  }

  /** Every event, fetched page by page. */
  all(params?: EventListParams, options?: RequestOptions): AutoPager<WsignEvent> {
    return this.autoPager<WsignEvent>('/events', params, options);
  }

  /** Delivers the event again, synchronously, to one endpoint or every subscribed endpoint. */
  async redeliver(
    id: string,
    params?: EventRedeliverParams,
    options?: RequestOptions,
  ): Promise<WsignResponse<EventRedelivery>> {
    return this.requestor.json<EventRedelivery>(
      'POST',
      buildPath`/events/${id}/redeliver`,
      paramsObject(params),
      options,
    );
  }
}
