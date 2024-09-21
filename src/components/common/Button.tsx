import React from 'react'

interface IButtonProps{
    text:string;
    onClick?:()=>void;
    type?:'submit'|'reset'|'button'
    
}

export const CustomButton:React.FC <IButtonProps>= ({type,text,onClick}) => {
  return (
   <button onClick={onClick ? onClick : undefined}  type={type} className='bg-maincolr text-white rounded-md w-32 p-2'>{text}</button>
  )
}

