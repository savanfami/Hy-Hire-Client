import React, { useState } from 'react'
import catergoryData from '../../assets/jsonData/Industry.json'
import CategoryIcon from '@mui/icons-material/Category';
import { useNavigate } from 'react-router-dom';
export const HomePageCategorySection: React.FC = () => {
    const [showAll,setShowAll]=useState<boolean>(false)
    const handleToggle=()=>{
        setShowAll((prevShowall=>!prevShowall))
    }
    const navigate=useNavigate()
    return (
        <>
            <div>
                <div className=" mt-12    text-teal-600  ">
                    <div className="flex justify-center text-2xl font-semibold font-sans   ">
                        <span className="text-maincolr pr-2">Explore Companies by</span>    <span className="text-black ">Category</span>
                    </div>
                </div>
                <div data-aos="fade-up" className="md:px-4    lg:px-16 xl:px-20 2xl:px-24 md:pb-10 max-md:px-5 grid md:grid-cols-4 md:gap-8 ">
                    {catergoryData.industries.slice(0, showAll?catergoryData.industries.length:8).map((data: any, index: number) => (
                        <div key={index} className="w-full xl:max-w-[1400px] 2xl:max-w-[1600px] cursor-pointer   max-md:max-w-full" onClick={()=>navigate(`joblistingbycategory/${data.sector}`)}>
                            <div className="md:mt-16 max-md:mt-10 max-md:max-w-full ">
                                <div className="flex md:gap-5 max-md:flex-col max-md:gap-0 md:h-[230px]  rounded-md">
                                    <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
                                        <div className="flex flex-col grow hover:text-white hover:bg-maincolr p-8 w-full border border-solid border-zinc-200 max-md:px-5 max-md:mt-8 group">
                                            <CategoryIcon />
                                            <div className="mt-8 text-2xl ">
                                                {data?.sector}
                                            </div>
                                            <div className="flex gap-4 px-px mt-3 text-lg leading-7">
                                                <div className="text-slate-500 group-hover:text-white cursor-pointer">235 jobs available</div>
                                                <img
                                                    loading="lazy"
                                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                                                    className="shrink-0 my-auto w-6 aspect-square"
                                                    alt="Job availability icon"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
             <div className='flex justify-center'>
                <p onClick={handleToggle}  className='text-maincolr underline text-lg cursor-pointer ' >{showAll?'Hide Categories':'show all categories'} </p>
             </div>

            </div>
        </>
    )
}

