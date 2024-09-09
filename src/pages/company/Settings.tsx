import React from 'react'
import VerifiedIcon from '@mui/icons-material/Verified';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import { SettingsOne } from './SettingsOne'
import { SettingsTwo } from './SettingsTwo'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRequest } from '../../redux/action/companyAction'
import  { AxiosError } from 'axios'

export const Settings = () => {
  const dispatch: AppDispatch = useDispatch()

  const handleIncompleteProfile = () => {
    toast("Please complete Your profile Inorder to send the verification request", {
      className: "bg-maincolr text-white font-ff "
    })
  }

  const handleVerificationRequest = async () => {
    try {

      const { data } = await dispatch(sendRequest()).unwrap()
      if (data) {
        toast.success(data?.message )
      } else {
        toast.error('some error occured')
      }


    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        toast.warning(message);
      } else {
        const message = 'An unexpected error occurred';
        toast.error(message);
      }
    }
  }

  const { user: { data } } = useSelector((state: RootState) => state.user)
  // console.log(data.profileCompleted)
  let statusMessage;
  if (data.approvalStatus === 'Rejected') {
     statusMessage = <div className='flex gap-2 text-red-500 font-semibold font-sans'>
       <p>verification rejected </p><DoDisturbIcon className='text-red-500 mb-2'/>
     </div>
      
  } else if (data.approvalStatus === 'Pending') {
    statusMessage = (
      <button
        className='bg-maincolr text-white rounded-md p-2 mb-3'
        onClick={() => {
          if (data.profileCompleted) {
            handleVerificationRequest()
          } else {
            handleIncompleteProfile()
          }
        }}
      >
        Send Verification Request
      </button>
    );
  } else if (data.approvalStatus === 'Approved') {
    statusMessage = <div className='flex font-sans text-blue-400 text-lg gap-2'>
   <p>verified</p>
    <VerifiedIcon className='mb-2 text-blue-400'/>
    </div>
  
  }
  console.log(data)
  return (
    <>
      <ToastContainer position='top-center' />
      <div className='  text-black font-gg flex items-center  text-xl h-16  '>
        <h1>Settings</h1>
      </div>
      {statusMessage}
      {/* <button className='bg-maincolr text-white  rounded-md p-2 mb-3' onClick={() => {
        if (data.profileCompleted ) {
          handleVerificationRequest()
        } else {
          handleIncompleteProfile()
        }
      }}>Send Verification  Request</button> */}

      <hr className="border-t border-gray-300" />
      <div>
        <Tabs defaultValue="account" >
          <TabsList className="grid w-full grid-cols-2 ">
            <TabsTrigger value="account">OverView</TabsTrigger>
            <TabsTrigger value="password">Social Links</TabsTrigger>
            {/* <TabsTrigger value="password">Team</TabsTrigger> */}
          </TabsList>
          <hr className="border-t border-gray-400" />

          <TabsContent value="account">
            <SettingsOne />
          </TabsContent>
          <TabsContent value="password">
            <SettingsTwo />
          </TabsContent>
        </Tabs>
      </div>

    </>
  )
}

