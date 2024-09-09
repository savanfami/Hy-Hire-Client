import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../redux/store'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const CompanyDetails = () => {

    const location=useLocation()
    const {companyId}=location.state||{} 
    const {request} = useSelector((state: RootState) => state?.admin);
    const companyData=request.find(item=>item.companyId._id === companyId);
const company=companyData.companyId 
if (!company) return <p>Companys not found.</p>;
// console.log(companyData,'company')                                                                                                                                                                                                                                                                                                                                                                                                                                                   )
  return (
    <> 
  <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md sm:mt-20 ">
  <Link to='/admin/request'> <ArrowBackIcon/></Link>
      <div className="flex items-center mb-6">
        <img 
          src={company.icon} 
          alt={`${company.icon} Icon`} 
          className="w-24 h-24 rounded-full mr-6"
        />
        <div>
          <h1 className="text-2xl font-bold mb-2  font-gg">{company.name}</h1>
          <p className="text-gray-700 font-gg "><span className="font-semibold">Email:</span> {company.email}</p>
          <p className="text-gray-700 font-gg mt-2"><span className="font-semibold">Founded Date:</span> {new Date(company.foundedDate).toLocaleDateString()}</p>
          <p className="text-gray-700 font-gg mt-2"><span className="font-semibold">Location:</span> {company.location}</p>
          <p className="text-gray-700 font-gg mt-2"><span className="font-semibold">Description:</span> {company.description}</p>
          <p className="text-gray-700 font-gg mt-2"><span className="font-semibold">Industry:</span> {company.sector}</p>
          <p className="text-gray-700 font-gg mt-2"><span className="font-semibold">Subindustry:</span> {company.subIndustry}</p>
        </div>
      </div>
      <div className="mb-6 font-gg">
        <p className="font-semibold mb-2">Website:</p>
        <a 
          href={company.website} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-blue-500 hover:underline "
        >
          {company.website}
        </a>
      </div>
      <div className='font-gg'>
        <p className="font-semibold mb-2">Social Links:</p>
        <div className="space-x-4">
          {company.socialLinks.facebook && (
            <a 
              href={company.socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-maincolr  hover:underline"
            >
              Facebook
            </a>
          )}
          {company.socialLinks.instagram && (
            <a 
              href={company.socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-maincolr hover:underline"
            >
              Instagram
            </a>
          )}
          {company.socialLinks.linkedIn && (
            <a 
              href={company.socialLinks.linkedIn} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-maincolr hover:underline"
            >
              LinkedIn
            </a>
          )}
          {company.socialLinks.twitter && (
            <a 
              href={company.socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-maincolr hover:underline"
            >
              Twitter
            </a>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

 
