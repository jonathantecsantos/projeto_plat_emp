import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../../redux/reducers/auth.slice"
import { RoutesNames } from "../../../globals"
import LogoutIcon from '@mui/icons-material/Logout'

export const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return <div className="flex gap-2 items-center cursor-pointer text-ring-custom"
    onClick={() => {
      dispatch(logout())
      // dispatch(clearEvaluations())
      navigate(RoutesNames.home)
    }}>
    <LogoutIcon className="text-right" />   
    <button className="text-right">
      Logout
    </button>
  </div>
}