import { z } from 'zod';


// healthCheck
export const HealthCheckRequestSchema = z.object({});
export type HealthCheckRequest = z.infer<typeof HealthCheckRequestSchema>;

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  details: z.object({
    database: z.boolean(),
  })
});

export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;
