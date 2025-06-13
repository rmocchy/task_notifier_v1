/** Types generated for queries found in "queries/users.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'CountUsersByCreatedAt' parameters type */
export interface ICountUsersByCreatedAtParams {
  created_at?: DateOrString | null | void;
}

/** 'CountUsersByCreatedAt' return type */
export interface ICountUsersByCreatedAtResult {
  count: string | null;
}

/** 'CountUsersByCreatedAt' query type */
export interface ICountUsersByCreatedAtQuery {
  params: ICountUsersByCreatedAtParams;
  result: ICountUsersByCreatedAtResult;
}

const countUsersByCreatedAtIR: any = {"usedParamSet":{"created_at":true},"params":[{"name":"created_at","required":false,"transform":{"type":"scalar"},"locs":[{"a":102,"b":112}]}],"statement":"                                 \nSELECT\n    COUNT(*) AS count\nFROM\n    users\nWHERE\n    created_at >= :created_at\n    AND is_active = TRUE"};

/**
 * Query generated from SQL:
 * ```
 *                                  
 * SELECT
 *     COUNT(*) AS count
 * FROM
 *     users
 * WHERE
 *     created_at >= :created_at
 *     AND is_active = TRUE
 * ```
 */
export const countUsersByCreatedAt = new PreparedQuery<ICountUsersByCreatedAtParams,ICountUsersByCreatedAtResult>(countUsersByCreatedAtIR);


