import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../redux/store'
import { Roles } from '../../../utils/types'
import { setYear } from '../../../redux/reducers/year.slice'
import { useGetDistinctYearsQuery } from '../../../api/studentApi'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

export const YearSelector = () => {
  const dispatch = useDispatch()
  const userGlobalState = useSelector((state: RootState) => state.userInfo)
  const { selectedYear } = useSelector((state: RootState) => state.year)
  const { data: years = [] } = useGetDistinctYearsQuery()

  const currentYear = new Date().getFullYear()
  const availableYears = Array.from(new Set([currentYear, ...years])).sort((a, b) => b - a)

  const isAdmin = userGlobalState.enumRole === Roles.Admin

  // Se não for admin, exibe apenas o ano atual de forma estática
  if (!isAdmin) {
    return (
      <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200">
        <CalendarTodayIcon className="text-gray-500 scale-75" />
        <span className="text-sm font-medium text-gray-600">Ano: {currentYear}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded-lg border border-gray-300 shadow-sm hover:border-[#3C14A4] transition-colors">
      <CalendarTodayIcon className="text-[#3C14A4] scale-75" />
      <select
        value={selectedYear}
        onChange={(e) => dispatch(setYear(Number(e.target.value)))}
        className="bg-transparent text-sm font-semibold text-gray-700 focus:outline-none cursor-pointer pr-1"
      >
        {availableYears.map((y) => (
          <option key={y} value={y}>
            Ano {y}
          </option>
        ))}
      </select>
    </div>
  )
}
