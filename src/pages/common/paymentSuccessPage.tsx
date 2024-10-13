import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Button } from '@mui/material';
import { CustomButton } from '../../components/common/Button';

export const PaymentSuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 rounded-lg ">
    <Card className="w-full max-w-md shadow-lg ">
      <CardHeader>
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4 ">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-center text-2xl font-bold text-gray-900">
          Welcome to Hy-Hire Premium!
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-gray-600 font-semibold mb-6">
          Your subscription has been successfully activated. You now have access to all premium features.
        </p>
       <Link to='/'><CustomButton text='Back to home'/></Link> 
        {/* <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <Sparkles className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <h3 className="font-medium text-sm">Exclusive Content</h3>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <Sparkles className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <h3 className="font-medium text-sm">Priority Support</h3>
          </div>
        </div> */}
      </CardContent>

    </Card>
  </div>

  )
}

