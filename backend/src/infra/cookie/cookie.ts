import { CookieConfigs, cookieID } from "./configs";
import { Context } from "hono";
import { setCookie, getCookie } from "hono/cookie";
import { CookieOptions } from "hono/utils/cookie";

export const getSetCookieFn = (
  c: Context,
  cookieId: cookieID
): setCookieFunc => {
  const config = CookieConfigs.find((cookie) => cookie.id === cookieId);
  if (!config) {
    throw new Error(`Cookie configuration for id "${cookieId}" not found.`);
  }
  const { key, expireInSec } = config;
  return (value: string, now: Date) => {
    const options: CookieOptions = {
      maxAge: expireInSec,
      expires: new Date(now.getTime() + expireInSec * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    };
    setCookie(c, key, value, options);
  };
};

export const getFetchCookie = (c: Context, key: cookieID): FetchCookieFunc => {
  return () => getCookie(c, key);
};

export type setCookieFunc = (value: string, now: Date) => void;
export type FetchCookieFunc = () => string | undefined;
