import { ReactNode, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { RootState } from '../../../redux/store'
import { checkAuth } from '../../../redux/reducers/auth.slice'


interface ProtectedRouteProps {
  children: ReactNode
  allowedRoles?: string[]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  const userProfile = useSelector((state: RootState) => state.auth.profile)

  useLayoutEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  if (allowedRoles && userProfile) {
    const userRole = userProfile.toLowerCase()
    const normalizedAllowedRoles = allowedRoles.map(role => role.toLowerCase())

    if (!normalizedAllowedRoles.includes(userRole)) {
      return <div className='flex flex-col justify-center items-center h-screen'>
        <p className='mb-2 text-lg'>Credencial inválida ou não autorizada.</p>
        <button onClick={() => navigate(-1)}>Voltar</button>
      </div>
    }
  }

  return <>{children}</>
}

export default ProtectedRoute
