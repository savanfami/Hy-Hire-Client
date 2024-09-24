import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Slider } from '../../components/ui/slider';
import { Button } from '../../components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { JobCard } from '../../components/user/JobCard';
import { getAllJob } from '../../redux/action/jobAction';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';


export const UserSideJobListing = () => {
  // const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [salary, setSalary] = useState([0, 100000]);
  // const categories = ['Commerce', 'Technology', 'Healthcare', 'Education', 'Finance'];
  const jobTypes = ['Full-time', 'Part-time', 'Intern', 'Remote', 'Contract'];
  const datePosted = ['24 hours', 'This week', 'This month', 'All time'];
  const dispatch: AppDispatch = useDispatch()


  const { jobs } = useSelector((state: RootState) => state?.job)

  const fetchData = async () => {
    try {
      await dispatch(getAllJob()).unwrap()
    } catch (error: any) {
      console.log(error)
    } finally {

    }
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
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

        <div className="col-span-12 md:col-span-3 xl:col-span-3 p-16 bg-teal-700 bg-opacity-10  shadow-md rounded-lg overflow-hidden">
          <div className="p-6 space-y-6">
            {/* <div>
              <h2 className="text-2xl italic font-semibold mb-4">Category</h2>
              <div className="space-y-2">
                {categories.slice(0, showMoreCategories ? categories.length : 3).map((category) => (
                  <div key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      id={category.toLowerCase()}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor={category.toLowerCase()} className="ml-2 text-gray-700">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="mt-2 hover:text-maincolr"
                onClick={() => setShowMoreCategories(!showMoreCategories)}
              >
                {showMoreCategories ? (
                  <>
                    Show Less <ChevronUp className="ml-1 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-1 h-4 w-4" />
                  </>
                )}
              </Button>
            </div> */}

            <div>
              <h2 className="text-2xl italic font-semibold mb-4">Job Type</h2>
              <div className="space-y-2">
                {jobTypes.map((type) => (
                  <div key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      id={type.toLowerCase()}
                      className="rounded text-blue-500 focus:ring-blue-500"
                    />
                    <label htmlFor={type.toLowerCase()} className="ml-2 text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl italic font-semibold mb-4">Date Posted</h2>
              <div className="space-y-2">
                {datePosted.map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      id={option.toLowerCase().replace(' ', '-')}
                      name="date-posted"
                      className="text-blue-500 focus:ring-blue-500"
                    />
                    <label
                      htmlFor={option.toLowerCase().replace(' ', '-')}
                      className="ml-2 text-gray-700"
                    >
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl italic font-semibold mb-4">Salary Range</h2>
              <Slider
                defaultValue={[0, 100000]}
                max={200000}
                step={1000}
                onValueChange={setSalary}
              />
              <div className="flex justify-between mt-2 text-sm text-gray-600">
                <span>${salary[0].toLocaleString()}</span>
                <span>${salary[1].toLocaleString()}</span>
              </div>
            </div>

            <button className="w-full bg-maincolr font-gg italic text-white font-bold py-2 px-4 rounded-md">
              Apply Filters
            </button>
          </div>
        </div>
        <div className='col-span-12 md:col-span-9 xl:col-span-9 p-4 '>

          {jobs && jobs.length > 0 ? (
            jobs.map((job: any) => (
              <JobCard key={job._id} job={job} value='job Details' />
            ))
          ) : (
            <p>no jobs found</p>
          )}
        </div>
      </div>
    </div >
  )
}


