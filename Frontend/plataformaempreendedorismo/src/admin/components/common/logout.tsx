import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RoutesNames } from "../../../globals"
import { logout } from '../../../redux/reducers/auth.slice'
import { clearUserInfo } from '../../../redux/reducers/userInfo.slice'
import { persistor, RootState } from '../../../redux/store'
import { AuthMenuComponent } from './authMenu'

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userGlobalState = useSelector((state: RootState) => state.userInfo);

  return (
    <div className='flex items-center'>
      {userGlobalState?.email ? (
        <AuthMenuComponent email={userGlobalState.email} />
      ) : null}
      <div
        className="flex gap-1 items-center cursor-pointer text-ring-custom hover:text-red-400"
        onClick={() => {
          dispatch(logout());
          dispatch(clearUserInfo());
          persistor.purge();
          navigate(RoutesNames.home, { replace: true });
        }}
      >
        <LogoutIcon className="text-right" />
        <button className="text-right">Logout</button>
      </div>
    </div>
  );
};
