import { useEffect, useState } from "react";

export const useDebounce = (value:string, delay=500) => {
    const [debounceValue,setDebounceValue]=useState(value)

  useEffect(()=>{
      const timout=setTimeout(() => {
        setDebounceValue(value)
      }, delay);
      return ()=>clearTimeout(timout) 
  },[value,delay])

  return debounceValue
  
  };