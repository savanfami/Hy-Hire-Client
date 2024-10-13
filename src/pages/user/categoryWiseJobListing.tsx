import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import Lootie from 'lottie-react'

import {
  Card,
  CardContent
} from "../../components/ui/card";
import { InfinitySpin } from 'react-loader-spinner';
import { getCompanyDataByCategory } from '../../redux/action/companyAction';
import animation from '../../../src/assets/lottieFiles/Animation - 1728127355120.json'
export const CategoryWiseCompanyListing: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const state = useSelector((state: RootState) => state?.user);
  const companyData = state?.companyData?.companies;
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const fetchCompanyData = async () => {
    setLoading(true);
    await dispatch(getCompanyDataByCategory(id as string)).unwrap();
    setLoading(false);
  };

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  return (
    <div>

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      ) : companyData.length > 0 ? (
        <div className="grid lg:grid-cols-4 gap-4 m-4">
          {companyData.map((data: any, index: number) => (
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
        <div className='flex justify-center'>

          <Lootie height={200}
            width={200} animationData={animation} />
        </div>
      )}
    </div>
  );
};
