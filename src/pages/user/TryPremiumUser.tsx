import React from 'react'
import { Navbar } from '../../components/user/Navbar'
import Footer from '../../components/common/Footer'
import { CustomButton } from '../../components/common/Button'
import { SkillSelector } from '../../components/common/SkillsFetchingComponent'

export const TryPremiumUser = () => {
    return (
        <>
            <div className='bg-gray-200 p-8 lg:p-20 w-full'>
                <div className='flex justify-center items-center'>
                    <div className="flex flex-col items-start pl-7 rounded-2xl bg-neutral-400 max-w-[619px] shadow-[0px_0px_2px_rgba(23,26,31,0.12)] max-md:px-5">
                        <div className="ml-3  text-2xl leading-loose text-sky-900 rotate-[2.4492937051703357e-16rad] max-md:ml-2.5">
                            Benefits
                        </div>
                        <div className="lg:ml-3 leading-5 text-white">
                            Stand out and get in touch with hiring managers
                            <br />
                            See how you compare to other applicants
                        </div>
                        <div className="mt-8 ml-3 text-xl leading-loose text-white rotate-[2.4492937051703357e-16rad] max-md:ml-2.5">
                            <span className="text-sky-900">Pricing</span>{" "}
                            <span className="text-sky-900">Plan</span>{" "}
                        </div>
                        <div className="flex gap-1.5 mt-2.5 ml-3 max-md:ml-2.5">
                            <div className="flex flex-col bg-black bg-opacity-0">
                                <div className="flex gap-1.5 bg-black bg-opacity-0">
                                    <div className="flex flex-col justify-center items-center px-1 my-auto w-4 h-4 rounded-full border border-black border-solid bg-black bg-opacity-0">
                                        <div className="flex shrink-0 bg-black rounded-full h-[9px] w-[9px]" />
                                    </div>
                                    <div className="text-sm leading-loose text-white">Bronze</div>
                                </div>
                            </div>
                            <div className="my-auto text-xs leading-loose text-white basis-auto rotate-[2.4492937051703357e-16rad]">
                                {" "}
                                ($9.95 for each month)
                            </div>
                        </div>
                        <div className="flex flex-col mt-4 ml-3 w-full text-white rounded-2xl bg-black bg-opacity-0 max-w-[438px] max-md:max-w-full">
                            <div className="flex gap-1.5 text-sm leading-loose bg-black bg-opacity-0">
                                <div className="flex shrink-0 my-auto w-4 h-4 rounded-full border border-gray-600 border-solid bg-black bg-opacity-0" />
                                <div className="flex-auto w-[413px]">
                                    Gold ( $19.95 for each month)
                                </div>
                            </div>
                            <div className="flex gap-1.5 pr-20 mt-3 bg-black bg-opacity-0 max-md:pr-5">
                                <div className="flex shrink-0 my-auto w-4 h-4 rounded-full border border-gray-600 border-solid bg-black bg-opacity-0" />
                                <div className="flex flex-auto gap-1">
                                    <div className="text-sm leading-loose">Platinum</div>
                                    <div className="flex-auto text-xs leading-loose rotate-[2.4492937051703357e-16rad] whitespace-nowrap ">
                                        (Free for the first 30 Days then, $29.95 for each month)
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-1.5 mt-3 text-sm leading-loose bg-black bg-opacity-0">
                                <div className="flex shrink-0 my-auto w-4 h-4 rounded-full border border-gray-600 border-solid bg-black bg-opacity-0" />
                                <div className="flex-auto w-[413px]">
                                    Diamond (Free for the first 30 Days then, $49.95 for each month)
                                </div>
                            </div>
                        </div>
                        <div className='p-7 lg:ml-28'>

                            <CustomButton text='Submit' />
                        </div>
                    </div>
                </div>
            {/* <SkillSelector/> */}
            </div>
        </>
    )
}


