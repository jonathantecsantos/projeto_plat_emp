import { CookieUtils } from "essencials"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { useUserLoginMutation } from "../api/userApi.slice"
import { login as loginAction } from '../redux/reducers/auth.slice'
import { setUserInfo } from "../redux/reducers/userInfo.slice"
import { Login, LoginTokenJWT } from "../utils/types"


export const UserApiService = () => {
  const dispatch = useDispatch()
  const [userLogin, { isLoading, isError, data }] = useUserLoginMutation()

  const login = async (payload: Login) => {
    try {
      const result = await userLogin(payload).unwrap()

      const decodedToken: LoginTokenJWT = jwtDecode(result.tokenJWT)
      
      CookieUtils.setCookie({ 'tk': result.tokenJWT }, Number(decodedToken.exp))
      CookieUtils.setCookie({ 'un': decodedToken.username }, Number(decodedToken.exp))

      dispatch(setUserInfo({
        tokenJWT: result.tokenJWT,
        email: decodedToken.email,
        id: decodedToken.id,
        username: decodedToken.username,
        exp: decodedToken.exp,
        enumRole: decodedToken.enumRole
      }))

      dispatch(loginAction(result))
      return result
    } catch (error) {
      console.error('UserApiService => Erro fazer login:', error)
      throw error
    }
  }

  return {
    login,
    isLoading,
    isError,
    data,
  }
}