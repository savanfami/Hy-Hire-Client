import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../components/admin/SeachBar'
import { useDispatch, useSelector } from 'react-redux'
import { listRequest, updateRequest } from '../../redux/action/adminAction'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'

function Request() {
  // const [company, requestCompany] = useState<User[]>([]);
  const dispatch: AppDispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState<string>('');


  const state = useSelector((state: RootState) => state?.admin)


  useEffect(() => {
    dispatch(listRequest()).unwrap()
  }, [dispatch])








  const handleStatusChange = async (companyId: string, status: string) => {
    const req = {
      companyId,
      status
    }
    const data = await dispatch(updateRequest(req)).unwrap()
    console.log(data)
    // dispatch(listRequest()).unwrap();
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    console.log(searchQuery)
  }

  return (


    <>

      <SearchBar values={`Total requests: ${state.request.length}`} onSearch={handleSearch} />

      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">icon</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined at</th> */}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {state.request.map((item) => {
            const company = item.companyId


            // console.log(company._id)
            return (
              <tr key={company._id}>
                <td> <img src={company.icon} className='w-12 h-12 ml-4 rounded-xl' alt="icon" /></td>
                <td className='px-6 py-4 whitespace-nowrap font-semibold font-gg'>{company.name}</td>
                {/* <td>{company._id}</td> */}
                {/* <td style={getStatusStyle(company.approvalStatus)} className='px-6 py-4 whitespace-nowrap font-gg ' ><span className='border  font-semibold p-2 rounded-xl w-10'>{company.approvalStatus}</span></td> */}
                <Link to='companyDetails' state={{ companyId: company._id }}><p className='p-2 whitespace-nowrap  border mt-4  text-white  border-white rounded-md '><span className='w-10 bg-maincolr p-2 rounded-md'>See Application</span></p></Link>
                <td className='px-6 py-4 whitespace-nowrap'>
                  {company.approvalStatus === 'Pending' ? (
                    <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusChange(company._id, e.target.value)} className='bg-maincolr text-white font-ff  p-2 rounded-md' id="">
                      <option value="">Select Action</option>
                      <option value="Approved">Accept</option>
                      <option value="Rejected">Reject</option>
                    </select>
                  ) : (
                    <span className={`p-2 rounded-md font-semibold `}>
                      {company.approvalStatus}
                    </span>
                  )}
                </td>
              </tr>
            )
          })}

        </tbody>
      </table>




    </>
  )
}

export default Request
