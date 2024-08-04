import { logout } from "./auth/logout.action"
import { registerUser } from "./auth/register.action"
import { loginUser } from "./auth/login.action"
import { loginWithGoogle } from "./auth/login-google.action"

export const server = {
  // Auth
  registerUser,
  loginUser,
  loginWithGoogle,
  logout
}
