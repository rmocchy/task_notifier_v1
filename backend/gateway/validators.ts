import { z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export function validateWithZod<T extends z.ZodType>(schema: T, data: unknown): { success: boolean; data?: z.infer<T>; error?: string } {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const validationError = fromZodError(err);
      return { success: false, error: validationError.message };
    }
    return { success: false, error: 'Validation failed: Unknown error' };
  }
}

export function validateRequest<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  const result = validateWithZod(schema, data);
  if (!result.success) {
    throw new Error(result.error || 'Validation failed');
  }
  return result.data as z.infer<T>;
}
