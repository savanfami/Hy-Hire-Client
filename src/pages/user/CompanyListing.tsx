import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { InfinitySpin } from "react-loader-spinner";
import industryData from "../../assets/jsonData/Industry.json";

import {
  Card,
  CardContent
} from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ICompanyData } from "../../types/userTypes";
import { Link } from "react-router-dom";
import { getAllCompany } from "../../redux/action/userActions";
import { FaSearch } from "react-icons/fa";
import { Suggestion } from "../../types/Common";
import axios from "axios";
import { PaginationComponent } from "../../components/common/PaginationComponent";
import { ICompanySearchParams } from "../../types/companyTypes";

export const UserSideCompanyListing = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [searchParams, setSearchParams] = useState<ICompanySearchParams>({
    companyName: "",
    location: "",
    industry: "",
    page: 1,
  });


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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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

  const state = useSelector((state: RootState) => state?.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getAllCompany(searchParams)
      ).unwrap();

      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!state?.CompanydataFetched) {
      fetchCompanies();
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [searchParams.page]);




  const handlePageChange = (page: number) => {
    setSearchParams(prev => ({ ...prev, page }))
  }

  console.log(searchParams,'search params')
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : (
        <>
          <div className="flex overflow-hidden flex-col items-center px-20 pt-20 pb-24 text-white bg-black max-md:px-5 max-md:pb-24">
            <div className="flex flex-col  w-[699px]">
              <div className="self-center text-4xl italic">
                Find great places to <span className="text-teal-600">work</span>
              </div>
            </div>
            <div className="bg-white max-sm:w-full w-[899px] mt-10 rounded-2xl shadow-lg p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-black">
                <input
                  type="text"
                  name="companyName"
                  placeholder="Company name"
                  value={searchParams.companyName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 outline-none"
                />
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={searchParams.location}
                    onChange={handleInputChange}
                    className="w-[70%] ml-6 rounded-md p-1 mt-2"
                  />

                  {suggestions.length > 0 && (
                    <ul
                      className="absolute border border-black mt-1 w-[70%] ml-6 rounded-md bg-white z-10"
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

                <select
                  name="industry"
                  className="w-full px-4 py-2 outline-none text-black"
                  value={searchParams.industry}
                  onChange={handleInputChange}
                >
                  <option value="">Select Category</option>
                  {industryData.industries.map((industry) => (
                    <option key={industry.sector} value={industry.sector}>
                      {industry.sector}
                    </option>
                  ))}
                </select>

                <button
                  onClick={fetchCompanies}
                  className="w-full bg-maincolr text-white px-4 py-2 rounded-md flex items-center justify-center"
                >
                  <FaSearch className="mr-2" />
                  Search
                </button>
              </div>
            </div>
          </div>

          <div>
            {state.companyData && state.companyData.companies.length > 0 ? (
              <div className="grid lg:grid-cols-4 gap-4 m-4">
                {state.companyData.companies.map((data: ICompanyData, index: number) => (
                  <Card
                    key={index}
                    className="md:w-[350px] m-2 border md:h-[230px] border-gray-200 shadow-md"
                  >
                    <CardContent>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5 items-center">
                          <img
                            src={data?.icon}
                            className="h-16 mt-2 rounded-md w-16"
                            alt="company logo"
                          />
                          <h1 className="font-bold font-gg ml-1">{data?.name}</h1>
                          <h2 className="font-semibold text-maincolr p-1 px-3 border rounded-full border-maincolr text-center whitespace-nowrap">
                            {data?.sector}
                          </h2>
                          <Link to={`/companyDetails/${data?._id}`}>
                            <button className="bg-maincolr p-1 text-white w-[200px] rounded-full mt-3">
                              Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='flex items-center justify-center w-full m-4'>
                <img
                  src="https://img.freepik.com/premium-vector/search-found-flat-style-design-vector-illustration-stock-illustration_357500-2864.jpg?ga=GA1.1.857803910.1725824513&semt=ais_hybrid"
                  className='h-auto w-auto'
                  alt="no data found icon"
                />
              </div>
            )}
          </div>

          {state.companyData && state.companyData.companies.length > 0 &&
            <PaginationComponent onPageChange={handlePageChange} page={searchParams.page} totalPages={state?.companyData?.totalPages} />
          }

        </>
      )}
    </div>
  );
};
