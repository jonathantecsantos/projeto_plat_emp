import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { TeamRegister } from "../site/components/teamRegister/teamRegister";


export const TeamRegisterPage = () => {
  return <GoogleReCaptchaProvider reCaptchaKey="6Ld9pigrAAAAAE6M7OUWswS4RbJFfdVJR-xlXZhR">
    <TeamRegister />
  </GoogleReCaptchaProvider>
}