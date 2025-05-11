import { CookieUtils } from "essencials"
import { useState } from "react"
import { RoutesNames } from "../../globals"


export const CookiePolicy = () => {
  const [consentGiven, setConsentGiven] = useState<boolean>(CookieUtils.getCookie('cookieConsent') ? true : false)

  const handleConsent = (value: boolean) => {
    if (value == true) {
      CookieUtils.setCookie({ cookieConsent: 'true' }, 7)
    } else {
      CookieUtils.setCookie({ cookieConsent: 'false' }, 1)
    }
    setConsentGiven(true)
  }

  if (consentGiven) {
    return null
  }

  return (
    <section className="fixed p-2 rounded-2xl mx-auto bg-white border border-gray-200 dark:bg-gray-800 
    left-1 bottom-2 dark:border-gray-700 ">
      <h2 className="font-semibold text-gray-800 dark:text-white">🍪 Política de Cookies</h2>

      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Utilizamos cookies para garantir a melhor experiência no nosso site. <a href={`${RoutesNames.privacyPolicy}`} target="_blank" className="text-blue-500 hover:underline">Saiba mais</a>. </p>

      <div className="flex mt-2 items-center justify-end  gap-x-2 shrink-0">
        <button onClick={() => handleConsent(true)} className="text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
          Aceitar
        </button>

        <button onClick={() => handleConsent(false)} className="text-xs bg-gray-900 font-medium rounded-lg hover:bg-gray-700 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
          Dispensar
        </button>
      </div>
    </section>
  )
}