// No funciona por el nombre del archivo
// Esto es solo una demostración

import type { MiddlewareNext } from "astro"
import { defineMiddleware } from "astro:middleware"

const privateRoutes = ["/protected"]

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context

  const authHeaders = request.headers.get("Authorization") ?? ""

  if (privateRoutes.includes(url.pathname)) {
    checkLocalAuth(authHeaders, next)
  }

  return next()
})

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {
  if (authHeaders) {
    const authValue = authHeaders.split(" ").at(-1) ?? "user:pass"
    const decodedValue = atob(authValue).split(":")

    const [user, password] = decodedValue

    if (user === "admin" && password === "admin") {
      return next()
    }
  }

  return new Response("Authorization required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"'
    }
  })
}
