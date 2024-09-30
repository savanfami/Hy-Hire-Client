import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Slider } from '../../components/ui/slider';
import { JobCard } from '../../components/user/JobCard';
import { getAllJob } from '../../redux/action/jobAction';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';

import { IJobFilterParams } from '../../types/jobTypes';
import { PaginationComponent } from '../../components/common/PaginationComponent';
import { InfinitySpin } from 'react-loader-spinner';



export const UserSideJobListing: React.FC = () => {
  console.log('frendred')
  const [salaryUpto, setSalary] = useState<string>('0');
  const [jobType, setJobType] = useState<string[]>([])
  const [page, setPage] = useState<number>(1);
  const [loading,setLoading]=useState<boolean>(false)
  const [datePostedd, setDatePosted] = useState<string | null>(null)
  // const categories = ['Commerce', 'Technology', 'Healthcare', 'Education', 'Finance'];
  const jobTypes = ['fulltime', 'parttime', 'intern', 'remote', 'contract'];
  const datePosted = ['last 24 hours', 'This week', 'This month', 'All time'];
  const [jobs, setJobs] = useState<any>(null)
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const jobsPerPage = 4;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const dispatch: AppDispatch = useDispatch()

  const handleSalaryChange = (value: any) => {
    setSalary(value);
  };

  const handleClearFilter = () => {
    setDatePosted(null)
    setJobType([])
    setSalary('0')
    setPage(1);
    fetchData({ salaryUpto: '0', jobType: [], datePostedd: null, page: 1 })
  }

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  };

  const handleDatePostedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.id;
    setDatePosted(selectedOption)
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchData({ salaryUpto, jobType, datePostedd, page: newPage });
  };

  const handleApplyFilter = () => {
    const filteredData = {
      salaryUpto,
      jobType,
      datePostedd,
      page: 1
    }
    setPage(1);
    fetchData(filteredData);
  };



  const fetchData = async (filterData: IJobFilterParams = { salaryUpto, jobType: [], datePostedd: null, page: 1 }) => {
    try {
      setLoading(true)
      const res = await dispatch(getAllJob(filterData)).unwrap()
      setLoading(false)
      if (res) {
        setJobs(res)
        setTotalJobs(res?.count)
      }
    } catch (error: any) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
    {loading?(
       <div className="flex justify-center items-center h-screen">
       <InfinitySpin
         width="200"
         color="#4fa94d"
       />
     </div>
    ):(
    <div>
      <div className="flex overflow-hidden  flex-col md:h-[310px] items-center px-20 pt-11 pb-36 font-black bg-black max-md:px-5 max-md:pb-24">
        <div className="flex flex-col items-center max-w-full w-[829px]">
          <div className="ml-6  font-normal text-3xl font-ff italic text-black">
            <span className="text-white">Search for</span>{" "}
            <span className="text-teal-600">Jobs</span>
          </div>
          <div className="text-3xl italic font-normal font-ff text-white max-md:max-w-full">
            <span className="">“Don’t wait for the right opportunity : </span>
            <span className="text-teal-600 ">Create it </span>
            <span className="">”</span>
          </div>

        </div>
        <div className="bg-white font-normal mt-10 rounded-2xl shadow-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Job Title/Company"
              className="w-full px-4 py-2 outline-none"
            />
            <select
              className="w-full px-4 py-2 outline-none"
            >
              <option value="">Select Location</option>
              <option value="">mepper</option>
              <option value="">perambra</option>
            </select>
            <select
              className="w-full px-4 py-2 outline-none"
            >
              <option value="">Select Category</option>
            </select>
            <button
              className="w-full bg-maincolr text-white px-4 py-2 rounded-sm flex items-center justify-center"
            >
              <FaSearch className="mr-2" />
              Search
            </button>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-12'>

        <div className="col-span-12 md:col-span-3 xl:col-span-3 p-16 shadow-md rounded-lg ">
          <div className="p-4 space-y-6 bg-neutral-300 rounded-lg ">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Job Type</h2>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.toLowerCase()}
                      value={type}
                      onChange={handleJobTypeChange}
                    />
                    <label htmlFor={type.toLowerCase()} className="ml-2 text-gray-800 font-semibold">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl  font-semibold mb-4">Date Posted</h2>
              <div className="space-y-2">
                {datePosted.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={option.toLowerCase().replace(' ', '-')}
                      name="date-posted"
                      onChange={handleDatePostedChange}

                    />
                    <label
                      htmlFor={option.toLowerCase().replace(' ', '-')}
                      className="ml-2 text-gray-800 font-semibold"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Salary Range</h2>
              <Slider
                defaultValue={[0]}
                max={5000000}
                step={5000}
                min={0}
                onValueChange={handleSalaryChange}
              />
              <div className="flex justify-between mt-2 font-semibold text-black">
                <span>₹{salaryUpto.toLocaleString()}</span>
                <span>₹5000000</span>
              </div>
            </div>
            <button onClick={handleApplyFilter} className="w-full bg-maincolr   text-white  py-2 px-4 rounded-md">
              Apply Filters
            </button>
            <button onClick={handleClearFilter} className="w-full bg-maincolr   text-white  py-2 px-4 rounded-md">
              Clear Filters
            </button>

          </div>
        </div>
        <div className='col-span-12 md:col-span-9 xl:col-span-9 p-4 '>
          {jobs && jobs.jobsWithDetails?.length > 0 ? (
            jobs?.jobsWithDetails?.map((job: any) => (
              <JobCard key={job._id} job={job} value='job Details' />
            ))
          ) : (
            <>
              <div className='flex justify-center items-center'>
                <img src="https://static.vecteezy.com/system/resources/previews/010/856/652/non_2x/no-result-data-document-or-file-not-found-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-etc-vector.jpg" className='h-[500px] mt-20 w-auto' alt="no data found icon" />
              </div>
            </>
          )}
          {
            jobs && jobs?.jobsWithDetails?.length > 0 &&
            <PaginationComponent onPageChange={handlePageChange} page={page} className='-ml-32' totalPages={totalPages} />
          }
        </div>
      </div>
    </div >
    )}
    </>
  )
}


