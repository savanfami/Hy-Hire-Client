import React from 'react'
import { Chat } from '../../components/common/Chat'
import { ChatMessageSection } from '../../components/common/ChatMessageSection'

export const Messages = () => {
  return (
  <>
  <div className='grid grid-cols-12 md:h-[580px] '>
    <div className='col-span-4  border border-gray-200 overflow-auto '>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
      <Chat/>
    </div>
    <div className='col-span-8   border border-gray-200'>
     <ChatMessageSection/>
      </div>    
  </div>
  </>
  )
}


