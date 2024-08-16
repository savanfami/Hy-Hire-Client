import React from "react";

export const Navbar = () => {
    return (
        <div className="flex justify-between items-center w-full py-2 px-8  shadow-sm max-md:px-5">


            <div className="flex gap-4">

              
            </div>
            <div className="flex gap-8">
                <button className='p-3 border border-gray rounded-md text-maincolr font-serif '>Back to homepage</button>
            <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e4cee254f34c1b0d94219eceace50994790ffa8aa3563eace1c31b078b15a88"
        className="object-contain w-10 aspect-square"
      />
            </div>
        </div>
    );
}