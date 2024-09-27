import React from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

// interface JobCardProps {
//     _id: string;
//     jobTitle: string;
//     employmentType: string;
//     salaryMin: string;
//     salaryMax: string;
//     endDate: string;
//     experience: string;
//     companyDetails: {
//       name: string;
//       location: string;
//       icon: string;
//     };
// }

interface IJobCardProps{
  job:any;
  value:string;
  onApply?:()=>void;
}

export const JobCard = ({job,value,onApply}:IJobCardProps) => {
  
  let linkTo
  if(value==='job Details'){
    linkTo=`/jobdetails/${job._id}`
  }else if(value==='Apply'){
    // linkTo='jobapply'
  }
  const createdTime=moment(job?.createdAt)
  const timeAgo=createdTime?.fromNow()

  return (
    <>
  <div className="flex mb-5  border border-gray-200 flex-col p-10 bg-white rounded-md w-full shadow-[0px_3px_8px_rgba(48,150,137,0.08)] max-md:px-5">
      <div className="flex flex-col w-full max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-between items-start w-full text-base text-teal-600 max-md:max-w-full">
          <div className="px-2 py-2 rounded-lg bg-teal-600 bg-opacity-10 min-h-[28px]">
           {timeAgo}
          </div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/19c397e228a66e1ec886be42efa8eaa06d56b6af19093963256cb3a4f31d3d9b?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
            className="object-contain shrink-0 w-6 aspect-square"
          />
        </div>
        <div className="flex gap-5 items-start self-start mt-4 text-black">
          <img
            src={job?.companyDetails.icon} 
            alt='company icon'
            className="object-contain shrink-0 w-10 aspect-square rounded-lg"
          />
          <div className="flex flex-col min-w-[240px]">
            <div className="text-3xl italic">{job?.jobTitle}</div>
            <div className="mt-5 text-base font-gg italic ">{job?.companyDetails.name}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 justify-between items-end mt-3 w-full text-base max-md:max-w-full">
        <div className="flex flex-wrap gap-6 items-end text-gray-500 min-w-[240px] max-md:max-w-full">
          <div className="flex gap-3 items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/080c9a96c98058908af805d4b70e15880395c45fccf8d35a6ff604cfa7978775?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <div className="self-stretch my-auto italic">{job?.companyDetails.sector}</div>
          </div>
          <div className="flex gap-3 items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/483fa6f34541f9b43c81b07c91dc6b61e1ee87ff0748a0f14e281a7f65789e22?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <div className="self-stretch my-auto italic">{job?.employmentType}</div>
          </div>
          <div className="flex gap-3 items-center whitespace-nowrap">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/23812a27abb9ce6facf638ece75684d78343029bd895e030781da3591d1f368e?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <div className="self-stretch my-auto italic">{job?.salaryMin}-{job?.salaryMax}</div>
          </div>
          <div className="flex gap-3 items-center">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9fed9d01b7d67bff1eb3d9eb90ff4a2d0a29dd287357695e0234b2b324370a08?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048"
              className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
            />
            <div className="self-stretch my-auto italic whitespace-nowrap">{job?.joblocation}</div>
          </div>
        </div>
       <Link to={linkTo as string}> <button onClick={onApply} className="overflow-hidden gap-2.5 self-stretch p-2  italic text-white capitalize bg-teal-600 rounded-lg min-h-[40px]">
          {value}
        </button></Link>
      </div>
    </div>

    </>
  )
}


