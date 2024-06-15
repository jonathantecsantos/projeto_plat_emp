import { CookieUtils } from "essencials";
import { useDispatch } from "react-redux";
import { useUserLoginMutation } from "../api/userApi.slice";
import { toggleLoading } from "../redux/reducers/loadingBar.slice";
import { setUserInfo } from "../redux/reducers/userInfo.slice";
import { Login } from "../utils/types";


export const UserApiService = () => {
  const dispatch = useDispatch();
  const [userLogin, { isLoading, isError, data }] = useUserLoginMutation();

  const login = async (payload: Login) => {
    try {
      // dispatch(toggleLoading())
      const result = await userLogin(payload).unwrap();
      CookieUtils.setCookie({ 'tk': result.data.token }, 1)
      CookieUtils.setCookie({ 'un': result.data.username }, 1)

      dispatch(setUserInfo(result))
      // dispatch(toggleLoading())
      return result;
    } catch (error) {
      // dispatch(toggleLoading())
      console.error('UserApiService => Erro fazer login:', error);
      throw error;
    }
  };

  return {
    login,
    isLoading,
    isError,
    data,
  };
}

/* ----------------example
const UserFormService = () => {
  const createUserMutation = useCreateUserMutation();
  const getUserQuery = useGetUserQuery();

  const createUser = async (payload: UserFormData): Promise<User | null> => {
    try {
      // Chamar a implementação do Redux para criar um usuário
      const { data: createdUser } = await createUserMutation.mutateAsync(payload);

      return createdUser;
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      return null;
    }
  };

  const getUserById = async (userId: string): Promise<User | null> => {
    try {
      // Chamar a implementação do Redux para encontrar um usuário pelo ID
      const { data: user } = await getUserQuery(userId);

      return user;
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      return null;
    }
  };

  return {
    createUser,
    getUserById,
  };
};

export default UserFormService; */