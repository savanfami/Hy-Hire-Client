import { FaBriefcase, FaBuilding, FaSearch, FaUsers } from "react-icons/fa";
import image from '../../assets/images/Remote vs On-site Staff Augmentationn.webp';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import axios from "axios";
import { URL } from "../../common/axiosInstance";


export const HomePageBannerSection = () => {
    const [count, setCount] = useState({
        totalUsers: 0,
        totalCompanies: 0,
        totalJobs: 0
    })

    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${URL}/job/count`)
            if (data) {
                setCount(data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <div data-aos="fade-up" className='relative w-full'>
                <img src={image} className='w-full max-w-full object-cover h-[600px] xl:h-screen lg:h-screen  sm:h-screen 2xl:h-screen md:h-[680px]' alt="Remote vs On-site Staff Augmentation" />
                <div className="absolute inset-0 bg-black h-[600px] bg-opacity-60 sm:h-screen lg:h-screen 2xl:h-screen xl:h-screen md:h-[680px]"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
                    <div className="text-center text-white mb-8">
                        <motion.h2 initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: '2', ease: 'easeInOut' }} className="text-3xl   overflow-hidden whitespace-nowrap sm:text-4xl font-ff mb-2">Find Your Dream Job Today!</motion.h2>
                        <p className="text-sm sm:text-md font-serif">Connecting talents with opportunity: Your gateway to career success</p>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-8">
                        <div className="text-center text-white">
                            <motion.div initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.1 }} className="bg-maincolr rounded-full p-4 inline-block">
                                <FaBriefcase className="text-2xl sm:text-3xl" />
                            </motion.div>
                            <p className="mt-2 text-sm sm:text-base">{count.totalJobs}+ Jobs</p>
                        </div>
                        <div className="text-center text-white">
                            <motion.div initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.1 }} className="bg-maincolr rounded-full p-4 inline-block">
                                <FaUsers className="text-2xl sm:text-3xl" />
                            </motion.div>
                            <p className="mt-2 text-sm sm:text-base">{count.totalUsers}+ Candidates</p>
                        </div>
                        <div className="text-center text-white">
                            <motion.div initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.1 }} className='bg-maincolr rounded-full p-4 inline-block'>
                                <FaBuilding className="text-2xl sm:text-3xl" />
                            </motion.div>
                            <p className='mt-2 text-sm sm:text-base'>{count.totalCompanies}+ Companies</p>
                        </div>
                    </div>
                </div>
            </div>
            <div>


                {/* <div className="flex justify-between max-md:flex-col max-md:items-center gap-5  px-20 py-10 bg-black flex-grow max-md:px-5">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/770a4e6103f286e94b1d3d1669dc249da07e42502e642d1538cf452a5fe2b921?"
              className=" max-md:mb-5 flex- shrink-0  aspect-[2.94] w-[140px]"
            />
            <img

              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4904f28658f99a11a21503292fbe4393085a660bc8ccd3bd00a030ce2dfd5ef9?"
              className="max-md:mb-5 shrink-0 max-w-full aspect-[2.5] w-[121px]"
            />
            <img

              src="https://cdn.builder.io/api/v1/image/assets/TEMP/c634a8b5e3b378b74bd1ec2b175d69412e52b7b1cf05563a12c6c459974cd610?"
              className="max-md:mb-5 shrink-0 max-w-full aspect-[2.78] w-[133px]"
            />
            <img

              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8db804bfda948d18bb9c75852a1414aa0f609a70ec9ed1e008120a8e7d29d8d6?"
              className="max-md:mb-5 shrink-0 max-w-full aspect-[2.63] w-[127px]"
            />
            <img

              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f03fec946025a3a283d260244dd1c49f1e47f273e15b1645adfd3ee87bd273ba?"
              className="max-md:mb-5 shrink-0 max-w-full aspect-[3.13] w-[148px]"
            />
          </div> */}
            </div>
        </>
    )
}



