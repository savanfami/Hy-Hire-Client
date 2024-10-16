import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import axios from 'axios';
import { URL } from '../../common/axiosInstance';
import { config } from '../../common/configurations';
import { IGetSubscriptionResponse } from '../../types/userTypes';
import { formateDatetoThree } from '../../utils/common/formatDate';


export const TotalRevenuePage: React.FC = () => {
    const [totalRevenue, setTotalRevenue] = useState<number>(0);
    const [subscriptionData, setSubscriptionData] = useState<IGetSubscriptionResponse[]>([])



    const fetchData = async () => {
        try {
            const { data } = await axios.get(`${URL}/user/subscriptions`, config)
            if (data) {
                setSubscriptionData(data?.data)
                setTotalRevenue(data?.totalAmount)
            }
            console.log(data)
        } catch (error: any) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container mx-auto p-4">

            <Card className="mb-6 bg-maincolr text-white">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">
                        Total Revenue
                    </CardTitle>
                </CardHeader>
                <CardContent >
                    <div className="text-2xl font-bold">₹{totalRevenue}</div>
                </CardContent>
            </Card>

            <Card className='bg-gray-100 text-black'>
                <CardHeader>
                    <CardTitle>Payment History</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Plan</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Expirty Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>cancelAtPeriodEnd</TableHead>
                                <TableHead>Cancellation Reason</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscriptionData.map((data, index) => (
                                <TableRow key={index}>
                                    <TableCell>{data.name}</TableCell>
                                    <TableCell>{data.email}</TableCell>
                                    <TableCell>{data.plan}</TableCell>
                                    <TableCell>₹ {data.amount}</TableCell>
                                    <TableCell>{formateDatetoThree(data.currentPeriodEnd)}</TableCell>
                                    <TableCell
                                        style={{
                                            color: data.status === 'active' ? 'green' : data.status === 'canceled' ? 'red' : 'black',
                                            fontWeight: 500, 
                                          
                                        }}
                                    >
                                        {data.status}
                                    </TableCell>                                   <TableCell>{data.cancelAtPeriodEnd ? 'Yes' : 'No'}</TableCell>
                                    <TableCell>{data.cancellationFeedback || 'not cancelled'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};