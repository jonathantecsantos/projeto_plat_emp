import { LoginComponent } from "../site/components/login"
import { CookieUtils } from "essencials"
export const LoginPage = () => {
  CookieUtils.setCookie({ 'version': `${import.meta.env.VITE_APP_VERSION}` }, 7)
  return <LoginComponent />
}