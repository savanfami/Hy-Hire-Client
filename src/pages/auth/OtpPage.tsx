import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarLoader } from 'react-spinners'
import { SlArrowLeft } from "react-icons/sl";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { verifyOtp } from '../../redux/action/userActions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../common/axiosInstance';


interface OtpPageProps {
  onBackToSignup: () => void;
}

const OtpPage: React.FC<OtpPageProps> = ({ onBackToSignup }) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '']);
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState('')
  const [timer, setTimer] = useState(30)
  const [resendEnabled, setresendEnabled] = useState(false)
  const navigate = useNavigate()

  const { user } = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()


  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp((prevOtp) => prevOtp.map((d, idx) => (idx === index ? element.value : d)));

    if (element.value !== '' && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleResendOtp = async () => {
    try {

      setresendEnabled(false)
      setTimer(30)

      await axios.post(`${URL}/auth/resendOtp`, {
        email: user.email,
        name: user.name
      })

    } catch (error: any) {
      console.log(error)
    }
  }

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    let otpNumber = otp.join('');
    console.log(otpNumber);

    try {
      const payload = {
        otp: otpNumber,
        email: user.email,
        name: user.name,
        role: user.role,
        password: user.password,
      };
      const { data } = await dispatch(verifyOtp(payload)).unwrap();
      setLoading(false);
      // console.log(data, 'verify otp data..............');
      if (data) {
        if (data?.role === "user") {
          navigate('/');
        } else if (data?.role === 'company') {
          navigate('/company')

        } else {
          navigate('/admin')
        }
      }
      else {
        toast.error('Signup failed');
      }
    } catch (err: any) {
      setLoading(false);
      console.log(err, '000000');
      if (err) {
        toast.error(err.message);
      } else {
        toast.error('An error occurred during OTP verification');
      }
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();

    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setresendEnabled(true);
    }
  }, [timer]);

  const isOtpComplete = otp.every((digit) => digit !== '');
  return (
    <div className="grid md:grid-cols-1 min-h-screen">
      <div className="flex items-center justify-center p-4 md:p-8">
        <form onSubmit={handleSubmit} className="text-center space-y-4 border border-solid border-maincolr shadow-sm p-6 md:p-10 rounded-md w-full max-w-md">
          <Link to='/signup'>
            <div className='flex items-center text-md font-serif text-start gap-1'>
              <SlArrowLeft />
              <h1 onClick={onBackToSignup}>Back to Signup</h1>
            </div>
          </Link>
          <h1 className="text-2xl font-serif font-bold">Verify <span className='text-maincolr'>Code</span> </h1>
          <span className="block font-serif text-gray-600 text-sm">An authentication code has been sent to your email</span>
          <div className="flex justify-center space-x-2 mt-4" >
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                ref={(el) => (inputRefs.current[index] = el)}
                value={data}
                onChange={(e) => handleChange(e.target as HTMLInputElement, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength={1}
                className="text-center border border-gray-300 rounded px-2 py-2 w-12 h-12"
              />
            ))}
          </div>
          <div className="text-center mt-2">
            <span className="text-sm font-semibold">Didn't receive the code?</span>
            {resendEnabled ? (
              <span className="text-maincolr cursor-pointer  font-semibold ml-1 text-sm" onClick={handleResendOtp}>
                Resend OTP
              </span>) :
              (
                <span
                  className={`text-sm ${timer < 10 ? 'text-red-600 font-semibold' : 'text-gray-600 font-semibold'}`}
                >
                  (  {timer} seconds )
                </span>)}


            {/* <span className="text-red-600 cursor-pointer ml-1 text-sm">Resend</span> */}
          </div>
          <button
            className={`mt-6 px-6 py-2 w-full text-white font-semibold  rounded-2xl ${isOtpComplete ? 'bg-maincolr' : 'bg-gray-300 cursor-pointer rounded-md'
              }`}
            disabled={!isOtpComplete}
          >
            {loading ? (<BarLoader color="#ffffff" />

            ) : ('Verify')}

          </button>
        </form>
      </div>
    </div>
  );
};

export default OtpPage;