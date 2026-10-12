/** Public by design: it ships in the bundle. Restrict it with the project's allowed origins. */
export const API_KEY = import.meta.env.KOOKEE_API_KEY || null;

export const ROADMAP_ENABLED = import.meta.env.KOOKEE_ROADMAP !== 'false';
export const STATUS_ENABLED = import.meta.env.KOOKEE_STATUS === 'true';
