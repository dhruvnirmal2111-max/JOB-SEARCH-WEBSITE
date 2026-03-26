export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/dashboard/:path*", "/resume/:path*", "/networking/:path*", "/career/:path*"],
}
