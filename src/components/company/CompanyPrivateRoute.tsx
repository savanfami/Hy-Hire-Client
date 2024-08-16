import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Children } from '../../types/Alltypes'

export const CompanyPrivateRoute = ({ children }: Children) => {
  const state = useSelector((state: RootState) => state.user)
  console.log(state)
  if (state.role === 'company' && state.user) {
    return children
  } else {
    return <Navigate to={'/'} />
  }

}


