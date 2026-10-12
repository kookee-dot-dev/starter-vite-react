import { KookeeApiError } from '@kookee/sdk';

const SLUG_PATTERN = /^[a-z0-9-]+$/;
const INCIDENT_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** A slug in Kookee's format, or `undefined`, which keeps a detail hook idle: no request for `/wp-login.php`. */
export function validSlug(slug: string): string | undefined {
  return SLUG_PATTERN.test(slug) ? slug : undefined;
}

/** An incident id is a UUID; anything else keeps the hook idle. */
export function validIncidentId(id: string): string | undefined {
  return INCIDENT_ID_PATTERN.test(id) ? id : undefined;
}

export function isNotFound(error: unknown): boolean {
  return error instanceof KookeeApiError && error.status === 404;
}
