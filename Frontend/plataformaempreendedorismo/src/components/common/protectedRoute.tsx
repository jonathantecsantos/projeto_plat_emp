import { ReactNode, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { checkAuth } from '../../redux/reducers/auth.slice'
import { RootState } from '../../redux/store'

interface ProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  useLayoutEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default ProtectedRoute
