import { z } from 'zod';


// healthCheck
export const HealthCheckRequestSchema = z.object({});
export type HealthCheckRequest = z.infer<typeof HealthCheckRequestSchema>;

export const HealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
});
export type HealthCheckResponse = z.infer<typeof HealthCheckResponseSchema>;

// integratedHealthCheck
export const IntegratedHealthCheckRequestSchema = z.object({});
export type IntegratedHealthCheckRequest = z.infer<typeof IntegratedHealthCheckRequestSchema>;

export const IntegratedHealthCheckResponseSchema = z.object({
  status: z.enum(['healthy', 'unhealthy']),
  timestamp: z.string().datetime(),
  details: z.object({
    database: z.boolean(),
  })
});

export type IntegratedHealthCheckResponse = z.infer<typeof IntegratedHealthCheckResponseSchema>;
