import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getUserData } from '../../redux/action/userActions';
import axios from 'axios';
import { URL } from '../../common/axiosInstance';
import { config } from '../../common/configurations';
import logo from '../../assets/images/logo.jpg';

const Navbar = React.memo(() => {
  const dispatch: AppDispatch = useDispatch();
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredRegister, setIsHoveredRegister] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false); 

  const state = useSelector((state: RootState) => state.user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchData = async () => {
    try {
      await dispatch(getUserData()).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch subscription status
  const checkSubscriptionStatus = async () => {
    try {
      const response = await axios.get(`${URL}/user/subscription-status`, config);
      setIsSubscribed(response.data?.isSubscribed);
    } catch (error) {
      console.error('Error checking subscription status:', error);
    }
  };

  useEffect(() => {
    if (state?.role === 'user' && !state?.dataFetched) {
      fetchData();
    }
    if (state?.role === 'user') {
      checkSubscriptionStatus(); 

    }
  }, []);

  const NavButton = ({ text, isHovered, setIsHovered }: any) => (
    <button
      className='w-full md:w-auto mb-2 md:mb-0 mr-0 md:mr-4 px-4 py-2 text-white border border-white rounded transition duration-400'
      style={{ backgroundColor: isHovered ? '#309689' : 'transparent', color: isHovered ? 'white' : 'black' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );

  const handleManageSubscription = async () => {
        try {
          const response = await axios.post(`${URL}/user/create-portal-session`,{},config);
          console.log(response)
          window.location = response.data.url; // Redirect to Stripe Customer Portal
        } catch (error) {
          console.error('Error creating customer portal session:', error);
        }
      };

  return (
    <nav className='bg-white head overflow-x-hidden'>
      <div className='mx-auto px-4 ms-2'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0'>
            <NavLink to='/'>
              <img src={logo} className='max-w-full' style={{ width: '155px' }} alt="logo hihyre" />
            </NavLink>
          </div>

          <div className='hidden md:flex md:items-center md:space-x-4 font-serif'>
            <NavLink to='' className={({ isActive }) => isActive ? 'text-black underline px-3 py-2' : 'block px-3 py-2 text-gray-500 hover:text-black'}>Home</NavLink>
            <NavLink to="joblisting" className={({ isActive }) => isActive ? 'text-black underline px-3 py-2' : 'block px-3 py-2 text-gray-500 hover:text-black'}>Find jobs</NavLink>
            <NavLink to='companyListing' className={({ isActive }) => isActive ? 'text-black underline px-3 py-2' : 'block px-3 py-2 text-gray-500 hover:text-black'}>Browse Companies</NavLink>
            <NavLink to='hehe' className={({ isActive }) => isActive ? 'text-black underline px-3 py-2' : 'block px-3 py-2 text-gray-500 hover:text-black'}>Contact Us</NavLink>
          </div>

          <div className='hidden md:flex font-serif'>
            {state && state?.role === 'user' ? (
              <>
                {isSubscribed ? (
                  <button  onClick={handleManageSubscription} className='px-4 py-2 gap-2 text-black rounded-sm hover:bg-maincolr hover:text-white'>
                    Manage Subscription
                  </button>
                ) : (
                  <NavLink to='trypremium'>
                    <NavButton text="Try Premium" isHovered={isHoveredRegister} setIsHovered={setIsHoveredRegister} />
                  </NavLink>
                )}
                <NavLink to='profile'>
                  <NavButton text="Dashboard" isHovered={isHoveredLogin} setIsHovered={setIsHoveredLogin} />
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to='login'>
                  <NavButton text="Login" isHovered={isHoveredLogin} setIsHovered={setIsHoveredLogin} />
                </NavLink>
                <NavLink to="joinas">
                  <NavButton text="Register" isHovered={isHoveredRegister} setIsHovered={setIsHoveredRegister} />
                </NavLink>
              </>
            )}
          </div>

          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black'>
              <FaBars size={24} />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className='md:hidden'>
          <div className='text-center px-2 pt-2 pb-3 space-y-1 sm:px-3 font-serif'>
            <NavLink to='' className='block px-3 py-2 text-gray-500 hover:text-black'>Home</NavLink>
            <NavLink to="joblisting" className='block px-3 py-2 text-gray-500 hover:text-black'>Find jobs</NavLink>
            <NavLink to="companyListing" className='block px-3 py-2 text-gray-500 hover:text-black'>Browse Companies</NavLink>
            <NavLink to="hehe" className='block px-3 py-2 text-gray-500 hover:text-black'>Contact Us</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
});

export default Navbar;
