import React from 'react'

export const Chat = () => {
  return (
    <div className="p-2 flex items-center border border-gray-200 ">
    <img
      src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      className="h-16 w-16 rounded-full"
      alt="Profile"
    />
    <div className="ml-4">
      <p className="font-semibold">John Doe</p>
      <p className="text-gray-500 text-sm">Hey, how are you?</p> 
    </div>
  </div>
  )
}

