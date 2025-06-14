import { Context } from "hono";
import { ZodSchema } from "zod";

type UseCaseFn<TArgs, TResult> = (args: TArgs) => Promise<TResult>;

export async function runUseCase<TArgs, TResult>({
  usecaseFn,
  reqSchema,
  context,
}: {
  context: Context;
  reqSchema: ZodSchema<TArgs>;
  usecaseFn: UseCaseFn<TArgs, TResult>;
}) {
  if (context.req.method === "GET") {
    return context.json(
      {
        error: "Method Not Allowed",
        message: "GET method is not allowed for this handler.",
      },
      405
    );
  }

  try {
    const reqJson = await context.req.json();
    const req = reqSchema.parse(reqJson);
    const result = await usecaseFn(req);
    return context.json(result, 200);
  } catch (err) {
    return handleHandlerError(context, err);
  }
}

export async function runUseCaseForGET<TArgs, TResult>({
  usecaseFn,
  reqSchema,
  context,
}: {
  context: Context;
  reqSchema: ZodSchema<TArgs>;
  usecaseFn: UseCaseFn<TArgs, TResult>;
}) {
  if (context.req.method !== "GET") {
    return context.json(
      {
        error: "Method Not Allowed",
        message: "Only GET method is allowed for this handler.",
      },
      405
    );
  }

  try {
    const queryParams = context.req.query();
    const req = reqSchema.parse(queryParams);
    const result = await usecaseFn(req);
    return context.json(result, 200);
  } catch (err) {
    return handleHandlerError(context, err);
  }
}

function handleHandlerError(context: Context, err: unknown) {
  // TODO: 将来的にエラーハンドリング機構を拡張
  console.error("Handler error:", err);
  return context.json(
    {
      error: "Internal Server Error",
      message: err instanceof Error ? err.message : String(err),
    },
    500
  );
}
