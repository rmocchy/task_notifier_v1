import { Context } from 'hono';

function timeoutMiddleware(timeoutMs: number) {
  return async (c: Context, next: () => Promise<void>) => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timed out')), timeoutMs);
    });

    try {
      await Promise.race([next(), timeoutPromise]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        return c.text(err.message, 504);
      }
      return c.text('Unknown error', 504);
    }
  };
}
export default timeoutMiddleware;