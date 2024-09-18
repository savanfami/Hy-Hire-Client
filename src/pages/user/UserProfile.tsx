import React from 'react'
import { ProfilePicSection } from '../../components/user/ProfilePicSection'

export const UserProfile = () => {


  return (
   <>
     <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
     <div className="lg:col-span-9 pb-4 flex flex-col justify-center leading-relaxed bg-white border border-solid border-zinc-200  relative">
                <div>
                  <ProfilePicSection/>
                </div>
                
            </div>
     </div>
   </>
  )
}

