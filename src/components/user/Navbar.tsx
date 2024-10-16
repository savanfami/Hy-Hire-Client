import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../redux/store";
// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export const Navbar = () => {
  const { user: { data } } = useSelector((state: RootState) => state.user)
  return (
    <div className="flex justify-between items-center w-full py-2 md:px-2  shadow-sm ">
      <div>
        {data?.name && (
          <div className="flex items-center">

            <img
              className=" w-10 h-10  p-1 md:mr-2 rounded-full"
              src={data?.image?data?.image:"https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt="user image icon"
            />

            <h1 className="text-maincolr font-gg font-bold text-xl">{data.name}</h1>
            {/* <KeyboardArrowDownIcon className="text-gray-500" /> */}
          </div>
        )}
      </div>

      <div className="flex md:gap-8 gap-2 ">
        <NavLink to='/'> <p className='mt-1  text-center md:no-underline md:p-2 p-1 border border-gray rounded-md bg-maincolr text-white font-serif md:w-36'>Home</p></NavLink>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e4cee254f34c1b0d94219eceace50994790ffa8aa3563eace1c31b078b15a88"
          className="object-contain w-10 aspect-square"
        />
      </div>
    </div>
  );
}