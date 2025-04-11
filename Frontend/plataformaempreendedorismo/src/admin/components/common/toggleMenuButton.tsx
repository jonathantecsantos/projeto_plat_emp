import { useDispatch, useSelector } from "react-redux"
import { toggleMenu } from "../../../redux/reducers/menu.slice"
import { RootState } from "../../../redux/store"
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwordIcon from '@mui/icons-material/ArrowForward'

export const ToggleMenuButton = () => {
  const isMenuOpen = useSelector((state: RootState) => state.menuState.isOpen)
  const dispatch = useDispatch()

  const handleToggle = () => {
    dispatch(toggleMenu())
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className=" bg-gray-400 text-white rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-900  shadow-lg transform hover:scale-105 transition-transform duration-300 cursor-pointer absolute inset-2 z-20 w-fit h-fit">
      {isMenuOpen ? <ArrowBackIcon /> : <ArrowForwordIcon />}
    </button>
  )
}