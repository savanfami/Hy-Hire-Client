import React, { useEffect, useState } from 'react'

export const UseEffectexample = () => {

    const [count,setCount]=useState(0)

    useEffect(()=>{
      console.log('component renders or count chagnes',count)
      return ()=>{
        console.log('clean up calleld')
      }
    },[count])
  return (
 <div>
  <button onClick={()=>setCount(count+1)}>inc</button>
  <p>{count}</p>
 </div>
    
  )
}

