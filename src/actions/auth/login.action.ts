import { firebase } from "@/firebase/config"
import { defineAction, z } from "astro:actions"
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth"

export const loginUser = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email().trim(),
    password: z.string(),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ email, password, remember_me }, { cookies }) => {
    if (remember_me) {
      cookies.set("email", email, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 year
        path: "/"
      })
    } else {
      cookies.delete("email", {
        path: "/"
      })
    }

    try {
      const user = await signInWithEmailAndPassword(
        firebase.auth,
        email,
        password
      )

      return user
    } catch (error) {
      const firebaseError = error as AuthError

      if (firebaseError.code === "auth/user-not-found") {
        throw new Error("El email no está registrado")
      }

      if (firebaseError.code === "auth/wrong-password") {
        throw new Error("La contraseña es incorrecta")
      }

      throw new Error("Auxilio algi salio mal")
    }
  }
})
