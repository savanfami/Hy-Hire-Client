import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { InfinitySpin } from 'react-loader-spinner';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { ICompanyData } from "../../types/userTypes";
import { Link } from "react-router-dom";
import { getAllCompany } from "../../redux/action/userActions";

export const UserSideCompanyListing = () => {
  const state = useSelector((state: RootState) => state?.user);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllCompany()).unwrap();
      if (result) {
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!state?.CompanydataFetched) {
      console.log('user effect called');
      fetchCompanies();
    }
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <InfinitySpin
            width="200"
            color="#4fa94d"
          />
        </div>
      ) : (
        <>
          <div className="flex overflow-hidden flex-col items-center px-20 pt-24 pb-40 text-white bg-black max-md:px-5 max-md:pb-24">
            <div className="flex flex-col max-w-full w-[699px] ">
              <div className="self-center text-4xl italic">
                Find great places to <span className="text-teal-600">work</span>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 gap-4 m-4">
            {state?.companyData.map((data: ICompanyData, index: number) => (
              <Card key={index} className="w-[350px]  m-2 border h-[230px] border-gray-200 shadow-md">
                <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5 items-center">
                      <img src={data?.icon} className="h-16 mt-2 rounded-md w-16" alt="companylogo" />
                      <h1 className="font-bold font-gg ml-1">{data?.name}</h1>
                      <h2 className="font-semibold    text-maincolr p-1 px-3 border rounded-full border-maincolr text-center whitespace-nowrap">{data?.sector}</h2>
                      <Link to={`/companyDetails/${data?._id}`}>
                        <button className="bg-maincolr p-1 text-white w-[200px] rounded-full mt-3">Details</button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};