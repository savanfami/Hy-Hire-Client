
import  { AxiosError } from 'axios';


interface StandardError {
  message: string;
  statusCode?: number;
  // data?: any;
}


export const handleAxiosError = (error: unknown): StandardError => {
  if (error instanceof AxiosError) {
    if (error.response) {
      return {
        message: error.response.data.message || 'Server Error',
        statusCode: error.response.status,
        // data: error.response.data,
      };
    } else if (error.request) {
      return {
        message: 'No response from server. Please try again later.',
      };
    } else {
      return {
        message: `Request error: ${error.message}`,
      };
    }
  } else if (error instanceof Error) {
    return { message: error.message };
  } else {
    return { message: 'An unknown error occurred.' };
  }
};