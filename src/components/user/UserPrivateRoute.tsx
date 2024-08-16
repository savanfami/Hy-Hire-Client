
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Children } from '../../types/Alltypes'

export const UserPrivateRoute = ({ children }: Children) => {
  const state = useSelector((state: RootState) => state.user)

  if (state &&state?.role==='user') {
    return children
  } else {
    return <Navigate to={'/'} />
  }

}


