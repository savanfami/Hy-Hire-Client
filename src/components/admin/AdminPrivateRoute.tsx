import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '../../redux/store'
import { Children } from '../../types/Alltypes'

export const AdminPrivateRoute = ({children}:Children) => {
  const state=useSelector((state:RootState)=>state.user)
  if(state.role==='admin'&&state.user){
    return children
  }else{
    return <Navigate to ={'/'}/>
  }

}

 
