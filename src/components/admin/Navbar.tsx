import React from "react";

export const AdminNavbar = () => {

  


  return (
    <div className="flex justify-between items-center w-full py-2 px-8  shadow-sm max-md:px-5">

    
      <div className="flex gap-4">
        <img
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/68e083068d4f1ef0af916a3f92c3c8864d8c7ddb002a76d06768f2b29486cb44"
          className="object-contain w-10 aspect-square"
        />
        <div className="flex gap-2">
          <div className="flex flex-col">
            <div className="text-base leading-relaxed text-slate-600">
              Admin
            </div>
            <div className="text-xl font-semibold leading-tight text-slate-800">
              SAVAN
            </div>
          </div>
         
        </div>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2e4cee254f34c1b0d94219eceace50994790ffa8aa3563eace1c31b078b15a88"
        className="object-contain w-10 aspect-square"
      />
    </div>
  
  );
};
