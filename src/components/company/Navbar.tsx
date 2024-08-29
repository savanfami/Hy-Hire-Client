import React from "react";
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
export const Navbar = () => {
    const { user: { data } } = useSelector((state: RootState) => state.user)
    console.log(data, '')
    return (
        <div className="flex justify-between items-center w-full py-2 px-8 shadow-sm max-md:px-5">
        <div className="">
          <div>
            {data?.name && (
              <div className="flex items-center">
         
                  <img 
                    className="w-10 h-10 rounded-xl  p-1 mr-2" 
                    src={data.icon?data.icon:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBg9zkf0PWdFupdiDjLIkF1rWzE_oC76dNaQ&s"} 
                    alt="company image" 
                  />
           
                <h1 className="text-maincolr font-gg font-bold text-xl">{data.name}</h1>
                <KeyboardArrowDownIcon className="text-gray-500"/>
                
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-8">
          <button className='p-3 border border-gray rounded-md text-white bg-maincolr text-md font-serif'>
            <span className="font-bold text-xl"> + </span> Post a Job
          </button>
          <div></div>
          <div className="flex items-center">
            <Link to='/notifications'>
              <img
                loading="lazy"
                src="https://cdn-icons-png.flaticon.com/512/3119/3119338.png"
                className="object-contain w-8 h-7"
              />
            </Link>
          </div>
        </div>
      </div>
    );
}