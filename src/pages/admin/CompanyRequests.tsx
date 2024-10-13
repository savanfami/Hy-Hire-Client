import React, { useEffect, useState } from 'react'
import { SearchBar } from '../../components/admin/SeachBar'
import { AnyIfEmpty, useDispatch, useSelector } from 'react-redux'
import { listRequest, updateRequest } from '../../redux/action/adminAction'
import { AppDispatch, RootState } from '../../redux/store'
import { Link } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog"
import { CustomButton } from '../../components/common/Button'
import { PaginationSection } from '../../components/common/PaginationSection'

const Request: React.FC = () => {
  // const [company, requestCompany] = useState<User[]>([]);
  const dispatch: AppDispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 5;
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [selectedcompanyId, setSelectedCompanyId] = useState<string>('')
  const [error, setError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false)

  const state = useSelector((state: RootState) => state?.admin)
  const rejectionReasons = [
    'Invalid Business Information',
    'Not Meeting Required Standards',
    'Suspected Fraud'
  ];

  const handleReasonChange = (e: any) => {
    setSelectedReason(e.target.value);
    setError('');
  };

  const handleCustomReasonChange = (e: any) => {
    setCustomReason(e.target.value);
    setError('');
  };



  useEffect(() => {
    dispatch(listRequest()).unwrap()
  }, [dispatch])

  const handleStatusChange = async (companyId: string, status: string) => {
    if (status === 'Rejected') {
      setOpen(true)
      setSelectedCompanyId(companyId)
    } else {
      const req = {
        companyId,
        status
      }
      await dispatch(updateRequest(req)).unwrap()

    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  
  const handleSubmit = async () => {
    console.log('Reason:', selectedReason || customReason);
    if (!selectedReason && !customReason.trim()) {
      setError('Please select a reason or provide a custom reason for rejection.');
      return;
    }
    const req = {
      companyId: selectedcompanyId,
      status: 'Rejected',
      reason: selectedReason || customReason
    }
   const data= await dispatch(updateRequest(req)).unwrap();
   if(data){
     setOpen(false);
     setSelectedReason('');
     setCustomReason('');
   }
  };
  
  const filteredCompanies = state.request.filter((company) =>
    company?.companyId?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company?.companyId?.approvalStatus.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const currentItems = filteredCompanies.slice(firstItemIndex, lastItemIndex);

  return (
    <>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>

        </AlertDialogTrigger>
        <AlertDialogContent className='bg-white'>
          <AlertDialogHeader>
            <AlertDialogTitle className='text-center'>Reason </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="p-4">
            {/* Predefined reasons */}
            <div>
              <p className="font-bold mb-2">Select a reason:</p>
              {rejectionReasons.map((reason, index) => (
                <label key={index} className="block mb-2">
                  <input
                    type="radio"
                    name="rejectionReason"
                    value={reason}
                    onChange={handleReasonChange}
                    className="mr-2"
                  />
                  {reason}
                </label>
              ))}
            </div>

            {/* Custom reason textarea */}
            <div className="mt-4">
              <p className="font-bold mb-2">Or provide a custom reason:</p>
              <textarea
                className="w-full border rounded p-2"
                rows={4}
                value={customReason}
                onChange={handleCustomReasonChange}
                placeholder="Write your custom reason here..."
              ></textarea>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <CustomButton onClick={handleSubmit}  text='Submit'/>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <SearchBar values={`Total requests: ${filteredCompanies?.length}`} onSearch={handleSearch} />

      <table className="min-w-full   shadow-sm rounded-lg overflow-hidden font-serif font-medium">
        <thead className="bg-maincolr text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">icon</th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Application</th>
            <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems?.map((item) => {
            const company = item.companyId
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
      
      <div className='mt-5'>
        <PaginationSection
          currentPage={currentPage}
          itemPerPage={itemPerPage}
          totalJobs={state?.request?.length} 
          setCurrentPage={setCurrentPage}
        />
      </div>
     


    </>
  )
}

export default Request
