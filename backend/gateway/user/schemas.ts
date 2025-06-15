import { z } from 'zod';

// ユーザー数カウントレスポンススキーマ
export const UserCountRequestSchema = z.object({});
export type UserCountRequest = z.infer<typeof UserCountRequestSchema>;  

export const UserCountResponseSchema = z.object({
  count: z.number().int().nonnegative(),
});

export type UserCountResponse = z.infer<typeof UserCountResponseSchema>;
