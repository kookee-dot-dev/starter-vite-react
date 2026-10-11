import { KookeeApiError } from '@kookee/sdk';

const SLUG_PATTERN = /^[a-z0-9-]+$/;

/** A slug in Kookee's format, or `undefined`, which keeps a detail hook idle: no request for `/wp-login.php`. */
export function validSlug(slug: string): string | undefined {
  return SLUG_PATTERN.test(slug) ? slug : undefined;
}

export function isNotFound(error: unknown): boolean {
  return error instanceof KookeeApiError && error.status === 404;
}
