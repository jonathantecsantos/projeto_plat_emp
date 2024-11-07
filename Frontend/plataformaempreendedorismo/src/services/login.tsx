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

/* ----------------example
const UserFormService = () => {
  const createUserMutation = useCreateUserMutation()
  const getUserQuery = useGetUserQuery()

  const createUser = async (payload: UserFormData): Promise<User | null> => {
    try {
      // Chamar a implementação do Redux para criar um usuário
      const { data: createdUser } = await createUserMutation.mutateAsync(payload)

      return createdUser
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
      return null
    }
  }

  const getUserById = async (userId: string): Promise<User | null> => {
    try {
      // Chamar a implementação do Redux para encontrar um usuário pelo ID
      const { data: user } = await getUserQuery(userId)

      return user
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      return null
    }
  }

  return {
    createUser,
    getUserById,
  }
}

export default UserFormService */