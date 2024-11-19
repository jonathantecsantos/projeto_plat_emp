import LogoutIcon from '@mui/icons-material/Logout'
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { RoutesNames } from "../../../globals"
import { clearUserInfo } from '../../../redux/reducers/userInfo.slice'
import { persistor } from '../../../redux/store'
import { logout } from '../../../redux/reducers/auth.slice'

export const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return <div className="flex gap-2 items-center cursor-pointer text-ring-custom"
    onClick={() => {
      dispatch(logout())
      dispatch(clearUserInfo())
      persistor.purge()
      // dispatch(clearEvaluations())
      navigate(RoutesNames.home, { replace: true })
    }}>
    <LogoutIcon className="text-right" />
    <button className="text-right">
      Logout
    </button>
  </div>
}