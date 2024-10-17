import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../common/axiosInstance'
import { config } from '../../common/configurations'
import { SearchBar } from '../../components/admin/SeachBar'
import { PaginationComponent } from '../../components/common/PaginationComponent'
import Lootie from 'lottie-react'
import Animation from '../../../src/assets/lottieFiles/Animation - 1728364855202.json'
import { IGetUserApplicationResponse } from '../../types/userTypes'
import { formateDatetoThree } from '../../utils/common/formatDate'
import { useNavigate } from 'react-router-dom'
export const UserJobApplications: React.FC = () => {
  interface Params {
    page: number;
    search?: string;
  }

  const navigate = useNavigate();

  const [applications, setApplications] = useState<IGetUserApplicationResponse[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [totalApplications, setTotalApplications] = useState<number>(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalApplications / itemsPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }
  const fetchData = async (page: number, query = '') => {
    const params: Params = { page }
    if (query.trim() !== '') {
      params.search = query;
    }
    const { data } = await axios.get(`${URL}/job/all-applications`, {
      ...config,
      params,
    })
    if (data) {
      setApplications(data.applications)
      setTotalApplications(data.totalCount)
    } else {
      console.log('no data found')
    }
  }

  useEffect(() => {
    fetchData(currentPage, searchQuery)
  }, [searchQuery, currentPage])

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'in-review':
        return ' border-yellow-300 text-yellow-600';
      case 'shortlisted':
        return ' border-blue-300 text-blue-600';
      case 'interview':
        return ' text-black';
      case 'hired':
        return 'bg-green-100 border-green-300 text-green-600';
      case 'rejected':
        return 'border-red-300 text-red-600';
      default:
        return '';
    }
  };
  return (
    <>
      <SearchBar values={`Total Applications :  ${totalApplications}`} onSearch={handleSearch} />
      {totalApplications !== 0 ? (
        <>
          <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hiring Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((data, index) => (
                <tr key={index}>
                  <td className='px-6 py-4  whitespace-nowrap'>{data.companyName}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{data.jobTitle}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{formateDatetoThree(data.appliedDate)}</td>
                  <td className={`px-6 py-4 whitespace-nowrap`}>
                    <span className={` border  p-2 rounded-full  ${getStatusClass(data.hiringStatus)}`}>
                    {data.hiringStatus}
                    </span>
                  </td>
                  <td><button onClick={()=>navigate(`${data?._id}`)} className='bg-maincolr text-white p-2 rounded-md'>Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <PaginationComponent className='mt-2' page={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </>
      ) : (
        <div className='flex justify-center'>
          <Lootie className='md:h-[600px]'
            animationData={Animation} />
        </div>
      )}
    </>
  )
}

