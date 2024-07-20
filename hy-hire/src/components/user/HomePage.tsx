import image from '../../assets/images/Remote vs On-site Staff Augmentationn.webp';
import { FaBriefcase, FaBuilding, FaSearch, FaUsers } from 'react-icons/fa';

const Homepage = () => {
  return (
    <div className="overflow-x-hidden">
      <div className='relative w-full'>
        <img src={image} className='w-full max-w-full object-cover h-[600px] xl:h-screen lg:h-screen  sm:h-screen 2xl:h-screen md:h-[680px]' alt="Remote vs On-site Staff Augmentation" />
        <div className="absolute inset-0 bg-black h-[600px] bg-opacity-60 sm:h-screen lg:h-screen 2xl:h-screen xl:h-screen md:h-[680px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl px-4">
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl sm:text-4xl font-ff mb-2">Find Your Dream Job Today!</h1>
            <p className="text-sm sm:text-md font-serif">Connecting talents with opportunity: Your gateway to career success</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Job Title/Company"
                className="w-full px-4 py-2 outline-none"
              />
              <select
                className="w-full px-4 py-2 outline-none"
              >
                <option value="">Select Location</option>
                <option value="">mepper</option>
                <option value="">perambra</option>
              </select>
              <select
                className="w-full px-4 py-2 outline-none"
              >
                <option value="">Select Category</option>
              </select>
              <button
                className="w-full bg-maincolr text-white px-4 py-2 rounded-sm flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                Search
              </button>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="text-center text-white">
              <div className="bg-maincolr rounded-full p-4 inline-block">
                <FaBriefcase className="text-2xl sm:text-3xl" />
              </div>
              <p className="mt-2 text-sm sm:text-base">2000+ Jobs</p>
            </div>
            <div className="text-center text-white">
              <div className="bg-maincolr rounded-full p-4 inline-block">
                <FaUsers className="text-2xl sm:text-3xl" />
              </div>
              <p className="mt-2 text-sm sm:text-base">5000+ Candidates</p>
            </div>
            <div className="text-center text-white">
              <div className='bg-maincolr rounded-full p-4 inline-block'>
                <FaBuilding className="text-2xl sm:text-3xl" />
              </div>
              <p className='mt-2 text-sm sm:text-base'>1000+ Companies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;