import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { ApplicationProgress } from './ProgressBar'


export const ApplicantDetail = () => {
    const { applicantDetails } = useSelector((state: RootState) => state?.job)
    const { id } = useParams()
    const applicantData = applicantDetails.find((data) => data.userDetails._id === id)
    const createdTime = moment(applicantData?.createdAt)
    const timeAgo = createdTime.format('MMMM Do YYYY, h:mm a');
    return (
        <div>
            <div className="flex flex-col rounded-md p-6 mx-auto w-full bg-white border border-solid border-zinc-200 max-w-[480px]">
                <div className="flex gap-5 items-start self-start text-base leading-relaxed text-slate-800">
                    <img
                        loading="lazy"
                        src={applicantData?.userDetails?.image} alt='profile image'
                        className="rounded-full w-24  aspect-square"
                    />
                    <div className="flex flex-col">
                        <div className="text-xl md:mt-8 font-semibold ">{applicantData?.userDetails?.name}</div>
                    </div>
                </div>
                <div className="flex flex-col p-4 mt-5 w-full leading-relaxed bg-slate-50">
                    <div className="flex gap-10 justify-between items-start w-full text-sm">
                        <div className="text-slate-800">Applied</div>
                        <div className="text-right text-slate-500">{timeAgo}</div>
                    </div>
                </div>
                <div className="flex gap-0.5 mt-2 w-full min-h-[11px]">
                    <ApplicationProgress status={applicantData?.hiringStatus || 'in-review'} />
                    <div className="flex flex-1 shrink bg-sky-400 basis-0 h-[11px] w-[67px]" />
                    <div className="flex flex-1 shrink bg-sky-400 basis-0 h-[11px] w-[66px]" />
                    <div className="flex flex-1 shrink bg-sky-400 basis-0 h-[11px] w-[67px]" />
                    <div className="flex flex-1 shrink basis-0 bg-zinc-200 h-[11px] w-[66px]" />
                </div>
                <div className="flex gap-2 items-start mt-5 w-full">
                    <div className="flex-1 shrink gap-2.5 self-stretch p-3  rounded-md text-base font-bold leading-relaxed text-center text-teal-600 border border-indigo-200 border-solid min-w-[240px]">
                        Schedule Interview
                    </div>

                </div>
                <div className="flex mt-5 w-full bg-zinc-200 min-h-[1px]" />
                <div className="flex flex-col items-start mt-5 w-full text-base leading-relaxed bg-white max-w-[304px]">
                    <div className="gap-px self-stretch w-full text-xl font-semibold leading-tight whitespace-nowrap text-slate-800">
                        Contact
                    </div>
                    <div className="flex gap-4 items-start mt-4 whitespace-nowrap">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a9afbd1e2a46ab1003e1cfbd505ebc5f52f7b6de3a55ad2f80981a833fb568b6?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                            className="object-contain shrink-0 w-6 aspect-square"
                        />
                        <div className="flex flex-col">
                            <div className="text-slate-500">Email</div>
                            <div className="text-slate-800">{applicantData?.userDetails?.email}</div>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start mt-4">
                        <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d18a8d35e25be7a06e41a511be975b2883921087a92e51cd2c75817ccc5f51dd?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                            className="object-contain shrink-0 w-6 aspect-square"
                        />
                        <div className="flex flex-col">
                            <div className="text-slate-500">Phone</div>
                            <div className="text-slate-800">{applicantData?.userDetails?.phone}</div>
                        </div>
                    </div>
                    {applicantData?.userDetails?.socialLinks?.Instagram &&
                        <div className="flex gap-4 items-start mt-4 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/219dcd7bafe4fbde8b213a90680d926cbaae722d84b269baf9675a65fb0ef919?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                                className="object-contain shrink-0 w-6 aspect-square"
                            />
                            <div className="flex flex-col">
                                <div className="text-slate-500">Instagram</div>
                                <div className="text-teal-600 break-words text-xs">
                                    <a
                                        href={applicantData?.userDetails?.socialLinks?.Instagram}
                                        target="_blank"
                                        className="underline hover:text-teal-800"
                                    >
                                        {applicantData?.userDetails?.socialLinks?.Instagram}
                                    </a>
                                </div>                            </div>
                        </div>
                    }
                    {applicantData?.userDetails?.socialLinks?.twitter &&
                        <div className="flex gap-4 items-start mt-4 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/100e58f2eb25874d566aee4156747502a2ae2264fa5bfc162126fed39615a368?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                                className="object-contain shrink-0 w-6 aspect-square"
                            />
                            <div className="flex flex-col">
                                <div className="text-slate-500">Twitter</div>
                                <div className="text-teal-600">{applicantData?.userDetails?.socialLinks?.twitter}</div>
                            </div>
                        </div>
                    }
                    {applicantData?.userDetails?.socialLinks?.LinkedIn &&
                        <div className="flex gap-4 items-start mt-4 whitespace-nowrap">
                            <img
                                loading="lazy"
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f401f0f3effa8f89b0aba4fd838a385870451021707f040d8370ac9696e98ab5?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
                                className="object-contain shrink-0 w-6 aspect-square"
                            />
                            <div className="flex flex-col">
                                <div className="text-slate-500">LinkedIn</div>
                                <div className="text-teal-600">{applicantData?.userDetails?.socialLinks?.LinkedIn}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}



