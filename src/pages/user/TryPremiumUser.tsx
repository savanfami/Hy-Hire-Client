import React, { ChangeEvent, useState } from 'react'
import { CustomButton } from '../../components/common/Button'
import { URL } from '../../common/axiosInstance'
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js'
import { config } from '../../common/configurations'



export const TryPremiumUser = () => {
    const [selectedPlan,setSelectedPlan]=useState('')

    const handlePlanChange=(event: ChangeEvent<HTMLInputElement>)=>{
         setSelectedPlan(event.target.value)
    }
 
    const handleProceedToPayment = async () => {
        if(!selectedPlan){
            alert('please select a plan')
            return 
        }
        try {
          const stripe = await loadStripe(
            'pk_test_51Q5fxNFYWf8ALHrOg11J9ShtSlyov5No7LOeeUKRSNaWFx77PKsi81FCc04Kwb89ze2RGNlCL9aF4uDb93BoQTqj00BMQD93q5' as string
          );
          const response = await axios.post(`${URL}/user/create-checkout-session`,{
            plan: selectedPlan
          }, config)
        console.log(response,'resopnse')
          if (stripe && response?.data?.id) {
            stripe.redirectToCheckout({
              sessionId: response?.data?.id,
            });
          }
        } catch (error) {
        //   setMessage("An error occurred while processing your payment.");
        }
      };

    return (
        <> 
            <div className='bg-gray-200 p-8 lg:p-20 w-full'>
                <div className='flex justify-center items-center'>
                    <div className="flex flex-col items-start pl-7 rounded-2xl bg-neutral-400 max-w-[619px] shadow-[0px_0px_2px_rgba(23,26,31,0.12)] max-md:px-5">
                        <div className="ml-3  text-2xl font-semibold leading-loose text-sky-900 rotate-[2.4492937051703357e-16rad] max-md:ml-2.5">
                            Benefits
                        </div>
                        <div className="lg:ml-3 leading-5 text-white">
                            Stand out and get in touch with hiring managers
                            <br />
                        </div>

                        <div className="mt-5 ml-3 text-xl leading-loose font-semibold text-white rotate-[2.4492937051703357e-16rad] max-md:ml-2.5">
                            <span className="text-sky-900">Pricing</span>{" "}
                            <span className="text-sky-900">Plan</span>{" "}
                        </div>

                        {/* Radio buttons for plans */}
                        <div className="flex flex-col mt-4 ml-3  text-white rounded-2xl bg-black bg-opacity-0 w-[500px]  max-md:max-w-full">
                            <label className="flex items-center gap-2 mb-3">
                                <input
                                    type="radio"
                                    value="bronze"
                                    checked={selectedPlan === 'bronze'}
                                    onChange={handlePlanChange}
                                />
                                Bronze (₹ 600 for each month)
                            </label>
                            <label className="flex items-center gap-2 mb-3">
                                <input
                                    type="radio"
                                    value="gold"
                                    checked={selectedPlan === 'gold'}
                                    onChange={handlePlanChange}
                                />
                                Gold (₹ 1600 for 3 months  <span className='text-sky-900 font-semibold'> - Save 200</span> )
                            </label>
                            <label className="flex items-center gap-2 mb-3">
                                <input
                                    type="radio"
                                    value="platinum"
                                    checked={selectedPlan === 'platinum'}
                                    onChange={handlePlanChange}
                                />
                                Platinum (₹ 3200 for 6 months <span className='text-sky-900 font-semibold'> - Save 400</span> )
                            </label>
                            <label className="flex items-center gap-2 mb-3">
                                <input
                                    type="radio"
                                    value="diamond"
                                    checked={selectedPlan === 'diamond'}
                                    onChange={handlePlanChange}
                                />
                                Diamond (₹ 6000 for 1 year  <span className='text-sky-900 font-semibold'> - Save 1200 </span> )
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className='p-7 lg:ml-28'>
                            <CustomButton onClick={handleProceedToPayment} text='Submit' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


