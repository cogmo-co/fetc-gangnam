import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // api, admin(로케일 무관), _next, _vercel, 정적파일(.*\..*) 제외
  matcher: "/((?!api|admin|_next|_vercel|.*\\..*).*)",
};
