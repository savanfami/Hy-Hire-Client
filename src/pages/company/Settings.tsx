import React from 'react'
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
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
// import toast, { Toaster } from 'react-hot-toast'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { sendRequest } from '../../redux/action/companyAction'

export const Settings = () => {
  const dispatch: AppDispatch = useDispatch()

 const  handleIncompleteProfile=()=>{
  toast("Please complete Your profile Inorder to send the verification request", {
    className: "bg-maincolr text-white font-ff "
  })
 }

 const handleVerificationRequest=async()=>{
     try{
   
      const data=await dispatch(sendRequest()).unwrap()
      console.log(data)


     }catch(error:any){
      console.log(error)
     }
 }

 const { user: { data } } = useSelector((state: RootState) => state.user)
  console.log(data.profileCompleted)
    return (
        <>
              <ToastContainer   position='top-center'/>
            <div className='  text-black font-gg flex items-center  text-xl h-16  '>
               <h1>Settings</h1>
            </div>
               <button className='bg-maincolr text-white  rounded-md p-2 mb-3' onClick={()=>{
                if(data.profileCompleted){
                  handleVerificationRequest()
                }else{
                  handleIncompleteProfile()
                }
               }}>Send Verification  Request</button>
            <hr className="border-t border-gray-300" />
            <div>
            <Tabs defaultValue="account" >
      <TabsList className="grid w-full grid-cols-2 ">
        <TabsTrigger  value="account">OverView</TabsTrigger>
        <TabsTrigger  value="password">Social Links</TabsTrigger>
        {/* <TabsTrigger value="password">Team</TabsTrigger> */}
      </TabsList>
      <hr className="border-t border-gray-400" />

      <TabsContent value="account">
        <SettingsOne/>
      </TabsContent>
      <TabsContent value="password">
     <SettingsTwo/>
      </TabsContent>
    </Tabs>
            </div>

        </>
    )
}

