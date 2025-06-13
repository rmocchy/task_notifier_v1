import { z } from 'zod';

// GoogleAuthUri
export const GoogleAuthUriRequestSchema = z.object({});
export type GoogleAuthUriRequest = z.infer<typeof GoogleAuthUriRequestSchema>;

export const GoogleAuthUriResponseSchema = z.object({
  url: z.string().url(),
});
export type GoogleAuthUriResponse = z.infer<typeof GoogleAuthUriResponseSchema>;

// TokenExchane
export const TokenExchangeRequestSchema = z.object({
  code: z.string().min(1),
});
export type TokenExchangeRequest = z.infer<typeof TokenExchangeRequestSchema>;

export const TokenExchangeResponseSchema = z.object({
  access_token: z.string(),
});
export type TokenExchangeResponse = z.infer<typeof TokenExchangeResponseSchema>;
