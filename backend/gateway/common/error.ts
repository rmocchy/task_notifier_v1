import { z } from "zod";

const ErrorResponseSchema = z.object({
  error: z
    .string()
    .describe("ユーザー向けエラータイプ（例: Internal Server Error）"),
  message: z.string().describe("開発者向けの詳細エラー内容"),
});

export const ErrResponses = {
  500: {
    description: "内部サーバーエラー",
    content: {
      "application/json": {
        schema: ErrorResponseSchema,
      },
    },
  },
};
