import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { SearchBar } from '../../components/admin/SeachBar'
import { listRequest } from '../../redux/action/adminAction'

export const CompanyListing = () => {

    const [searchQuery, setSearchQuery] = useState<string>('');

    const dispatch: AppDispatch = useDispatch()
    useEffect(() => {
        dispatch(listRequest()).unwrap()
    }, [dispatch])

    const state = useSelector((state: RootState) => state?.admin)
    console.log(state)
    const findApprovedCompany = state.request.filter((company) => company.companyId.approvalStatus === 'Approved')
   
    const handleSearch=(query:string)=>{
        setSearchQuery(query)
        console.log(searchQuery)
    }
    return (
        <>

            <SearchBar values={`Total Companies: ${findApprovedCompany.length}`} onSearch={handleSearch}  />

            <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">icon</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined at</th> */}
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">email</th>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th> */}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {findApprovedCompany.map((item) => {
                        const company = item.companyId
                        return (
                            <tr key={company._id}>
                                <td> <img src={company.icon} className='w-12 h-12 ml-4 rounded-xl' alt="icon" /></td>
                                <td className='px-6 py-4 whitespace-nowrap font-semibold font-gg'>{company.name}</td>
                                <td className='px-6 py-4 whitespace-nowrap font-semibold font-gg'>{company.email}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>




        </>
    )
}

export default CompanyListing
