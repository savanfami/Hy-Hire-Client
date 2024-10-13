import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

export const HomePagefeaturedJobs = () => {
  const state=useSelector((state:RootState)=>state?.job)
 const job=state?.jobs?.jobsWithDetails
  const navigate=useNavigate()

 

  const handleJobClick = (jobId: string) => {
    navigate(`/jobDetails/${jobId}`);
  };
  return (
    <>
      <div  className='mt-10 '>
        {job?.length > 0 &&
          <div className="flex flex-col px-16 pt-3 my-5 pb-20 max-md:px-5 ">
            <div className="flex flex-col sm:flex-row justify-center items-center max-w-full w-full px-4 text-teal-600">
              <div className="flex text-2xl font-semibold font-sans text-center mb-4 sm:mb-0">
                <span className="">Featured </span>
                <span className="text-black pl-2">jobs</span>
              </div>
            </div>
            <div data-aos="fade-up"  className="mt-11 max-md:mt-10 max-md:max-w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {job.slice(0, 6).map((data:any, index:number) => {
                  // const companyDetails = getCompanyDetails(data.companyId);
                  return (
                    <div key={index} className="flex flex-col" >
                      <div className="flex flex-col w-full  cursor-pointer" onClick={() => handleJobClick(data._id)}>
                        <div className="flex grow gap-5 justify-center px-6 py-7 w-full rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                          <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                            <div className="text-lg font-medium leading-7 text-zinc-900">
                              {data?.jobTitle}
                            </div>
                            <div className="flex gap-2 mt-2.5">
                              <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                                {data?.employmentType}
                              </div>
                              <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                                Salary: ₹{data?.salaryMin} - ₹{data?.salaryMax}
                              </div>
                            </div>
                            <div className="flex gap-3 mt-5">
                              <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                                {/* Display company image */}
                                  <img
                                    loading="lazy"
                                    src={data?.companyDetails.icon}
                                    alt={data?.companyDetails.name}
                                    className="w-8 aspect-square"
                                  />          
                              </div>
                              <div className="flex flex-col self-start mt-1.5">
                                {/* Display company name */}
                                <div className="text-base font-medium leading-6 text-zinc-900">
                                  {data?.companyDetails?.name}
                                </div>
                                <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?"
                                    className="shrink-0 aspect-square w-[18px]"
                                  />
                                  <div className="flex-auto">{data?.joblocation}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};
