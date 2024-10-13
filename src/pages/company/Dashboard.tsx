import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { getCompany } from '../../redux/action/companyAction'

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch()


  const fetchData = async () => {
    try {
      await dispatch(getCompany()).unwrap()
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className='flex  justify-center '>
    <h1 className='font-gg text-2xl'> WELCOME TO DASHBOARD</h1>
  </div>
  )
}

export default Dashboard

