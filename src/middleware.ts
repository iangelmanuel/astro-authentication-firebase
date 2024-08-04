import { defineMiddleware } from "astro:middleware"
import { firebase } from "./firebase/config"

const privateRoutes = ["/protected"]
const notAuthenticatedRoutes = ["/login", "/register"]

export const onRequest = defineMiddleware(
  async ({ redirect, url, locals }, next) => {
    const isLoggedIn = !!firebase.auth.currentUser
    const user = firebase.auth.currentUser

    locals.isLoggedIn = isLoggedIn
    if (user) {
      locals.user = {
        email: user.email ?? "",
        name: user.displayName ?? "",
        avatar: user.photoURL ?? "",
        emailVerified: user.emailVerified
      }
    }

    if (!isLoggedIn && privateRoutes.includes(url.pathname)) {
      return redirect("/")
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect("/")
    }
    return next()
  }
)
