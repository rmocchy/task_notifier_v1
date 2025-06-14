// cookieIDがidと一致するようにas const satisfies CookieSetによって型を制約しています。
const AccessTokenCookie = {
    id: "access_token",
    key: "access_token",
    expireInSec: 60 * 15,  // 15 minutes
    availablePath: "/",
} as const satisfies CookieSet;

const RefreshTokenCookie = {
    id: "refresh_token",
    key: "refresh_token",
    expireInSec: 60 * 60 * 24 * 10,  // 10 days
    availablePath: "/",
} as const satisfies CookieSet;

export const CookieConfigs = [
    AccessTokenCookie,
    RefreshTokenCookie,
] as const;

// string型ではなくいずれかのidに一致するようにしないとエラーになる
// そもそもcookieIDはメソッドで動的に設定することを想定しない
export type cookieID = typeof CookieConfigs[number]['id'];

interface CookieSet {
    id: string;
    key: string;
    expireInSec: number;
    availablePath?: string;
}