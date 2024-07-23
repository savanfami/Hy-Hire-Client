import logo from '../../assets/images/logo.jpg'
import { useState } from 'react';
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isHoveredLogin, setIsHoveredLogin] = useState(false);
  const [isHoveredRegister, setIsHoveredRegister] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


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

  return (
    <nav className='bg-white overflow-x-hidden '>
      <div className=' mx-auto px-4 ms-2'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex-shrink-0'>
        <Link to='/'> <img src={logo} className='max-w-full' style={{ width: '155px' }} alt="logo hihyre" /></Link>
          </div>

          <div className='hidden md:flex md:items-center md:space-x-4 font-serif'>
            <Link to='' className='block px-3 py-2 text-gray-500 hover:text-black'>Home</Link>
            <a href="#" className='block px-3 py-2 text-gray-500 hover:text-black'>Find jobs</a>
            <a href="#" className='block px-3 py-2 text-gray-500 hover:text-black'>Browse Companies</a>
            <a href="#" className='block px-3 py-2 text-gray-500 hover:text-black'>Contact Us</a>
          </div>

          <div className='hidden md:flex font-serif'>
            <Link to='login'>  <NavButton text="Login" isHovered={isHoveredLogin} setIsHovered={setIsHoveredLogin} />
            </Link>
            <Link to="joinas">
              <NavButton text="Register" isHovered={isHoveredRegister} setIsHovered={setIsHoveredRegister} />
            </Link>
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
          <div className=' text-center px-2 pt-2 pb-3 space-y-1 sm:px-3 font-serif'>
            <Link to='' className='block px-3 py-2 text-gray-500 hover:text-black'>Home</Link>
            <a href="#" className='block px-3 py-2 text-gray-500 hover:text-black'>Find jobs</a>
            <a href="#" className='block px-3 py-2 text-gray-500 hover:text-black'>Browse Companies</a>
            <a href="#" className='block px-3 py-2 text-gray-500 hover:text-black'>Contact Us</a>
          </div>
          <div className='pt-4 pb-3 border-t border-gray-200 font-serif'>
            <Link to='/login'>  <NavButton text="Login" isHovered={isHoveredLogin} setIsHovered={setIsHoveredLogin} />
            </Link>
            <Link to="/nav">
              <NavButton text="Register" isHovered={isHoveredRegister} setIsHovered={setIsHoveredRegister} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar