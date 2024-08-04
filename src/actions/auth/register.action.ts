import { firebase } from "@/firebase/config"
import { defineAction, z } from "astro:actions"
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  type AuthError
} from "firebase/auth"

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string().min(2),
    email: z.string().email().trim(),
    password: z.string().min(8).max(100),
    remember_me: z.boolean().optional()
  }),
  handler: async ({ name, email, password, remember_me }, { cookies }) => {
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

    // Create a user with email and password
    try {
      const user = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      )

      if (firebase.auth.currentUser === null) {
        throw new Error("No se pudo crear el usuario")
      }

      await updateProfile(firebase.auth.currentUser, {
        displayName: name
      })

      await sendEmailVerification(firebase.auth.currentUser!, {
        url: "http://localhost:4321/protected?emailVerified=true"
      })

      return user
    } catch (error) {
      const firebaseError = error as AuthError

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("El email ya está en uso")
      }
      throw new Error("Auxilio algi salio mal")
    }
  }
})
