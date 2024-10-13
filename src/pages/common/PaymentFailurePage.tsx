import React from 'react';
import { XCircle, RefreshCw, CreditCard, HelpCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Alert, AlertDescription } from '../../components/ui/alert';

export  function SubscriptionPaymentFailed() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-center text-2xl font-bold text-gray-900">
            Subscription Payment Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>
              We couldn't process your premium subscription payment. Please try again or use a different payment method.
            </AlertDescription>
          </Alert>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <CreditCard className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Payment Options</h3>
                <p className="text-sm text-gray-600">
                  Ensure your card has sufficient funds and isn't expired. You can also try a different payment method.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <HelpCircle className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Need Help?</h3>
                <p className="text-sm text-gray-600">
                  Our support team is here to assist you with any payment issues you might encounter.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          {/* <Button className="w-full">
            Try Again
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button> */}
          <Button variant="outline" className="w-full">
            Contact Support
            <HelpCircle className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}