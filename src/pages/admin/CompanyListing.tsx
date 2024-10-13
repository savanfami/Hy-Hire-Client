import React, { useEffect, useState } from 'react';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { SearchBar } from '../../components/admin/SeachBar';
import { listRequest } from '../../redux/action/adminAction';
import { PaginationSection } from '../../components/common/PaginationSection';

export const CompanyListing = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemPerPage = 5;
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const dispatch: AppDispatch = useDispatch();

  
  useEffect(() => {
    dispatch(listRequest()).unwrap();
  }, [dispatch]);

  const state = useSelector((state: RootState) => state?.admin);


  const findApprovedCompany = state.request.filter((company) => company.companyId.approvalStatus === 'Approved');

  
  const filteredCompanies = findApprovedCompany.filter((company) =>
    company.companyId.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.companyId.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const currentItems = filteredCompanies.slice(firstItemIndex, lastItemIndex);

  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); 
  };

  return (
    <>
      <SearchBar values={`Total Companies: ${filteredCompanies.length}`} onSearch={handleSearch} />

      <table className="min-w-full bg-white border border-gray-300 shadow-sm rounded-lg overflow-hidden font-serif font-medium">
        <thead className="bg-maincolr text-white">
          <tr>
            <th className="px-6 w-1/3 py-3 text-left text-xs font-medium  uppercase tracking-wider">icon</th>
            <th className="px-6 w-1/3 py-3 text-left text-xs font-medium  uppercase tracking-wider">Name</th>
            <th className="px-6 w-1/3 py-3 text-left text-xs font-medium  uppercase tracking-wider">email</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((item) => {
            const company = item.companyId;
            return (
              <tr key={company._id}>
                <td className='w-1/3'>
                  <img src={company.icon} className='w-12 h-12 ml-4 rounded-xl' alt="icon" />
                </td>
                <td className='px-6 w-1/3 py-4 whitespace-nowrap font-semibold font-gg'>{company.name}</td>
                <td className='px-6 w-1/3 py-4 whitespace-nowrap font-semibold font-gg'>{company.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='mt-5'>
        <PaginationSection
          currentPage={currentPage}
          itemPerPage={itemPerPage}
          totalJobs={filteredCompanies.length} 
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default CompanyListing;
