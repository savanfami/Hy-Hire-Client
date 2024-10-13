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
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Suggestion } from '../../types/Common';



export const UserSideJobListing: React.FC<any> = () => {
  const [salaryUpto, setSalary] = useState<any>('0');
  const [jobType, setJobType] = useState<string[]>([])
  const [page, setPage] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const [datePostedd, setDatePosted] = useState<any>('')
  const jobTypes = ['fulltime', 'parttime', 'intern', 'remote', 'contract'];
  const datePosted = ['last 24 hours', 'This week', 'This month', 'All time'];
  const [jobs, setJobs] = useState<any>(null)
  const [totalJobs, setTotalJobs] = useState<number>(0);
  const jobsPerPage = 4;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const [searchParams, setSearchParams] = useState({
    jobname: "",
    location: "",
  });
  const dispatch: AppDispatch = useDispatch()

  const handleSalaryChange = (value: any) => {
    setSalary(value);
  };

  const handleClearFilter = () => {
    setDatePosted([])
    setJobType([])
    setSalary('0')
    setPage(1);
    fetchData({ salaryUpto: '0', jobType: [], datePostedd: '', page: 1 })
  }

  const handleJobTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setJobType((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleDatePostedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const type = event.target.value;
    setDatePosted(datePostedd === type ? null : type); 
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    fetchData({ salaryUpto, jobType, datePostedd, page: newPage });
  };

  const fetchPlaceSuggestions = async (input: string) => {
    if (input.length > 2) {
      const apiKey = import.meta.env.VITE_GOOGLE_API_KEY as string;

      const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${input}&apiKey=${apiKey}`;

      try {
        const response = await axios.get(url);
        setSuggestions(response.data.features);
      } catch (error) {
        console.error("Error fetching place suggestions:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
    if (name === "location") fetchPlaceSuggestions(value);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setSearchParams({
      ...searchParams,
      location: suggestion.properties.formatted,
    });
    setSuggestions([]);
  };

  const handleApplyFilter = () => {
    const filteredData = {
      salaryUpto,
      jobType,
      datePostedd,
      page: 1,
      jobname: searchParams.jobname,
      location: searchParams.location
    }
    setPage(1);
    fetchData(filteredData);
  };

  const fetchData = async (filterData: IJobFilterParams = {
    salaryUpto, jobType: [], datePostedd: '', page: 1, jobname: searchParams.jobname,
    location: searchParams.location
  }) => {
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
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleClear = (field:any) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      [field]: "",
    }));
  };
  return (
    <>
      <ToastContainer position='top-right' />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <InfinitySpin
            width="200"
            color="#4fa94d"
          />
        </div>
      ) : (
        <div>
          <div className="flex overflow-hidden  flex-col md:h-[310px] items-center px-20 pt-11 pb-36 font-black bg-black max-md:px-5 max-md:pb-24">
            <div className="flex flex-col items-center max-w-full w-[829px]">
              <div className="ml-6  font-normal text-3xl font-ff italic text-black">
                <span className="text-white">Search for</span>{" "}
                <span className="text-teal-600">Jobs</span>
              </div>
              <div className="text-3xl italic font-normal font-ff text-white max-md:max-w-full ">
                <span className="">“Don’t wait for the right opportunity : </span>
                <span className="text-teal-600 ">Create it </span>
                <span className="">”</span>
              </div>

            </div>
            <div className="bg-white font-normal max-sm:w-full w-[599px] mt-5 rounded-2xl shadow-lg px-4 py-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <div className="relative">
                  <input
                    type="text"
                    name="jobname"
                    placeholder="Job name"
                    value={searchParams.jobname}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 mt-2 outline-none"
                  />
                  {searchParams.jobname && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => handleClear("jobname")}
                    >
                      &times;
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    className="md:w-[200px] mt-2 px-4 py-2 outline-none"
                  />
                  {searchParams.location && (
                    <button
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => handleClear("location")}
                    >
                      &times;
                    </button>
                  )}

                  {suggestions.length > 0 && (
                    <ul
                      className="absolute border border-black mt-1 w-full rounded-md bg-white z-10"
                      style={{ maxHeight: "100px", overflowY: "auto" }}
                    >
                      {suggestions.map((suggestion, index) => (
                        <li
                          className="border-b border-gray-300 p-2 hover:bg-gray-100"
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          style={{ cursor: "pointer" }}
                        >
                          {suggestion.properties.formatted}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  onClick={handleApplyFilter}
                  className="bg-maincolr ml-10 text-white px-4 py-2 rounded-md flex items-center justify-center mt-2"
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
                          checked={jobType.includes(type)}
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
                     {datePosted.map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          type="checkbox"
                          id={type.toLowerCase().replace(' ','-')}
                          value={type}
                          onChange={handleDatePostedChange}
                          checked={datePostedd.includes(type) }
                        />
                        <label htmlFor={type.toLowerCase().replace(' ','-')} className="ml-2 text-gray-800 font-semibold">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-4">Salary Range</h2>
                  <Slider
                    defaultValue={[salaryUpto]}
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
            <div data-aos="fade-up" className='col-span-12 md:col-span-9 xl:col-span-9 p-4 '>
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


