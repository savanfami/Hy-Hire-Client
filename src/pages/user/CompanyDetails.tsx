import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useParams } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import LocationOn from '@mui/icons-material/LocationOn';

export const CompanyDetail = () => {
  const { id } = useParams()
  const  state  = useSelector((state: RootState) => state?.user)
  const companyDetails = state?.companyData?.companies?.find((data: any) => data?._id === id);

  return (
    <>
      {
        companyDetails &&
        <div className="container mx-auto px-4 py-8 ml-0">
          <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
            <img
              loading="lazy"
               src={companyDetails?.icon}
              className="object-contain w-[189px] h-[189px] md:ml-0 lg:ml-44"
            />
            <div className="flex flex-col w-full md:w-auto">
              <div className="flex flex-col items-center md:items-start">
                <div className="flex flex-col md:flex-row gap-3 items-center">
                  <div className="text-4xl md:text-5xl  leading-none font-gg">
                    {companyDetails.name}
                  </div>
                  {/* <div className="px-3 py-1 text-base leading-relaxed text-center text-teal-600 border border-teal-600 border-solid">
                    43 Jobs
                  </div> */}
                </div>
                <div className="mt-3 text-base hover:underline font-semibold leading-relaxed text-teal-600">
                  {companyDetails?.website && (
                    <a href={companyDetails.website} target="_blank" rel="noopener noreferrer">
                      {companyDetails.website}
                    </a>
                  )}
                </div>
                <div className="mt-3   text-gray-400 leading-none ">
                  <LocationOn/> {companyDetails.location}
                  </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 items-start mt-6">
                {[
                  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a74f0865b1e8a0476abce2073ceccbadd361a64511a430b1f09884cc7e8b0bc3?apiKey=c721d257b1b04fddbe0f725293ce8048&", title: "Founded", value:  new Date(companyDetails?.foundedDate).toLocaleDateString()  },
                  { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6102e43fafc075e2024da98acd1db00287bb82bdedc498c070f060331ab210bd?apiKey=c721d257b1b04fddbe0f725293ce8048&", title: "Industry", value: companyDetails?.sector },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 items-center">
                    <div className="flex gap-2.5 items-center justify-center p-2.5 w-11 h-11 bg-white rounded-full">
                      <img
                        loading="lazy"
                        src={item.icon}
                        className="object-contain w-6 aspect-square"
                        alt={item.title}
                      />
                    </div>
                    <div className="flex flex-col text-base leading-relaxed">
                      <div className="text-slate-600">{item.title}</div>
                      <div className="font-semibold font-gg">{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-start text-base leading-tight  font-gg md:ml-0 lg:ml-44">
            <div className="text-3xl ">Company Profile</div>

            <div className="mt-4 leading-7  text-slate-600 ">
              {companyDetails?.description}
            </div>
            <div className="mt-6 text-3xl ">Contact</div>
            <div className="flex flex-wrap gap-4 mt-4 font-medium leading-relaxed text-teal-600">
              {companyDetails?.socialLinks&&[
                { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e389c334d03580ad29183185a2c3125fc5b29fcdfea51fbd8d795a1a209f3fa5?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048", text: companyDetails?.socialLinks?.twitter },
                { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2eb8598f9110ce8069cac51e72d415ba020b18a01252db5adf073e14e8f4040d?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048", text: companyDetails?.socialLinks?.facebook },
                { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9d7e47374bcd751211f995f1a88eb7bd917cf2bed0142448f73a7f322d18d0d?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048", text: companyDetails?.socialLinks?.linkedIn },
                { icon: "https://banner2.cleanpng.com/20180729/uwy/1a179ff9617a9bf05426d9170b164557.webp",text: companyDetails?.socialLinks?.linkedIn },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-2 border border-teal-600 border-solid">
                  <img
                    loading="lazy"
                    src={item.icon}
                    className="object-contain shrink-0 self-start w-6 aspect-square"
                    alt={`Social icon ${index + 1}`}
                  />
                  <a href={item.text} className="basis-auto">{item.text}</a>
                </div>
              ))}
            </div>
          </div>
          <div className='flex justify-between'>
            <h1 className='mt-6 flex justify-center md:justify-start text-3xl italic font-gg md:ml-44'>Open Positions</h1>
            <h1 className='text-maincolr font-gg mt-8 md:mt-6'>show all jobs <ArrowForwardIcon className='text-maincolr' /></h1>
          </div>

          {/* <div className="flex   gap-2.5 my-auto text-base font-semibold leading-6  mr-44 md:mr-44 justify-end">
        <div className="my-auto  cursor-pointer text-maincolr">Show all jobs</div>  
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/c51a738af9200d73eeb5bf69e0c9fd1e8e4b33a3ad95b27a9a9a9348ba14dbdc?"
          className="shrink-0 w-6 aspect-square"
        />
      </div> */}
        </div>
      }
    </>
  )
}