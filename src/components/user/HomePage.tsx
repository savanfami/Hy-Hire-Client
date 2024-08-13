import image from '../../assets/images/Remote vs On-site Staff Augmentationn.webp';
import { FaBriefcase, FaBuilding, FaSearch, FaUsers } from 'react-icons/fa';
import workerimage from '../../assets/images/Banner.png'
import { RootState } from '../../redux/store';
import toast,{ Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// import Navbar from '../common/Navbar';
// import Footer from '../common/Footer';

export const Homepage = () => {

  // const { user } = useSelector((state: RootState) => state.user)

 
 
  return (
    <div className="overflow-x-hidden">
   <Toaster
        position="top-right"
        reverseOrder={false}
      />
      {/* <Navbar /> */}
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
      <div>
        <div className="flex justify-between max-md:flex-col max-md:items-center gap-5  px-20 py-10 bg-black flex-grow max-md:px-5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/770a4e6103f286e94b1d3d1669dc249da07e42502e642d1538cf452a5fe2b921?"
            className=" max-md:mb-5 flex- shrink-0  aspect-[2.94] w-[140px]"
          />
          <img

            src="https://cdn.builder.io/api/v1/image/assets/TEMP/4904f28658f99a11a21503292fbe4393085a660bc8ccd3bd00a030ce2dfd5ef9?"
            className="max-md:mb-5 shrink-0 max-w-full aspect-[2.5] w-[121px]"
          />
          <img

            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c634a8b5e3b378b74bd1ec2b175d69412e52b7b1cf05563a12c6c459974cd610?"
            className="max-md:mb-5 shrink-0 max-w-full aspect-[2.78] w-[133px]"
          />
          <img

            src="https://cdn.builder.io/api/v1/image/assets/TEMP/8db804bfda948d18bb9c75852a1414aa0f609a70ec9ed1e008120a8e7d29d8d6?"
            className="max-md:mb-5 shrink-0 max-w-full aspect-[2.63] w-[127px]"
          />
          <img

            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f03fec946025a3a283d260244dd1c49f1e47f273e15b1645adfd3ee87bd273ba?"
            className="max-md:mb-5 shrink-0 max-w-full aspect-[3.13] w-[148px]"
          />
        </div>
      </div>
      <div className="flex flex-col mt-5 px-5 font-sans mx-5">
        <div className="self-center text-2xl  leading-tight font-semibold text-maincolr">
          Most Popular <span className="text-black font-semibold">Vacancies</span>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-5 mx-10 sm:mx-6 md:mx-8 lg:mx-10 ">
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Anesthesiologists
          </div>
          <div className=" text-sm leading-5 text-gray-500">
            45,904 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">Surgeons</div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            50,364 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Obstetricians-Gynecologists
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            4,339 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">Orthodontists</div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            20,079 Open Positions
          </div>
        </div>


        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Maxillofacial Surgeons
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            74,875 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Software Developer
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            43359 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">Psychiatrists</div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            18,599 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Data Scientist
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            28,200 Open Positions
          </div>
        </div>


        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Financial Manager
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            61,391 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Management Analysis
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            93,046 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">IT Manager</div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            50,963 Open Positions
          </div>
        </div>
        <div className="md:mt-5 mt-1">
          <div className="text-lg leading-7 text-zinc-900 hover:text-teal-600 hover:underline cursor-pointer transition duration-300">
            Operations Research Analysis
          </div>
          <div className="mt-1 text-sm leading-5 text-gray-500">
            16,627 Open Positions
          </div>
        </div>
      </div>
      <div className=" mt-12    text-teal-600  ">
        <div className="flex justify-center text-2xl font-semibold font-sans   ">
          <span className="text-maincolr pr-2">Explore by</span>    <span className="text-black ">       Category</span>
        </div>
        <div className="flex md:-mt-6 mt-2  gap-2.5 my-auto text-base font-semibold leading-6  mr-44 md:mr-44 justify-end">
          <div className="my-auto  cursor-pointer">Show all jobs</div>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c51a738af9200d73eeb5bf69e0c9fd1e8e4b33a3ad95b27a9a9a9348ba14dbdc?"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
      </div>
      <div className="flex flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pb-20 max-md:px-5">
        <div className="flex flex-col w-full max-w-[1192px] xl:max-w-[1400px] 2xl:max-w-[1600px] max-md:max-w-full">

          <div className="mt-16 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full ">
                <div className="flex flex-col grow hover:text-white hover:bg-maincolr p-8  w-full border border-solid border-zinc-200 max-md:px-5 max-md:mt-8 group">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/b7a2ed2b86d0872b2df2812c99e8762749efb4efa46bad05ecb25d399dd2d3cf?"
                    className="w-12 aspect-square bg-white rounded-full p-1 inline-block"
                  />
                  <div className="mt-8 text-2xl leading-7">
                    Design
                  </div>
                  <div className="flex gap-4 px-px mt-3 text-lg leading-7">
                    <div className="text-slate-500 group-hover:text-white cursor-pointer">235 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 mx-auto w-full bg-white border border-solid border-zinc-200 max-md:px-5 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/cb04edfd61d197e3d4756e82834e496a98b91438479d74bb95bae3d81da27b0e?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl  leading-7 text-slate-800">
                    Sales
                  </div>
                  <div className="flex gap-4 px-px mt-3 text-lg leading-7 text-slate-500">
                    <div>756 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full ">
                <div className="flex flex-col grow p-8 mx-auto w-full max-md:px-5 border border-solid border-zinc-200 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/725ec1ebf514ce5bf1e0d3fd4643e5d12e7d0be9df9055a0aaa58517d0e147f9?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl text-black leading-7">
                    Marketing
                  </div>
                  <div className="flex  text-slate-500 gap-4 px-px mt-3 text-lg leading-7">
                    <div>140 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ec9ea434b1edb58bb7f7f36daf5789ef8e975cb195f9c8f2bdc13b63e412d2f?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 mx-auto w-full bg-white border border-solid border-zinc-200 max-md:px-5 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/462c7e2cf0b21d5ddd50e2776299ab14368ff96bd3029a50c145a1e0a687d0e1?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl  leading-7 text-slate-800">
                    Finance
                  </div>
                  <div className="flex gap-4 px-px mt-3 text-lg leading-7 text-slate-500">
                    <div>325 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 mx-auto w-full bg-white border border-solid border-zinc-200 max-md:px-5 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/621362e168ae825c43ae0242a2d905e4039bd7a639b99047db521a163335d6cc?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl  leading-7 text-slate-800">
                    Hospital
                  </div>
                  <div className="flex gap-4 px-px mt-3 text-lg leading-7 text-slate-500">
                    <div>436 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 mx-auto w-full bg-white border border-solid border-zinc-200 max-md:px-5 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/261257926fe5510fac81d015b65289dbf0cf3a01942a8a2aa37208e95b3c3924?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl  leading-7 text-slate-800">
                    Engineering
                  </div>
                  <div className="flex gap-4 px-px mt-3 text-lg leading-7 text-slate-500">
                    <div>542 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 mx-auto w-full bg-white border border-solid border-zinc-200 max-md:px-5 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/61528717a9fbda991f4ba233b47d4fb20f1fd36d0c0fda807f4ff6ba31011fa0?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl  leading-7 text-slate-800">
                    Business
                  </div>
                  <div className="flex gap-4 px-0.5 mt-3 text-lg leading-7 text-slate-500">
                    <div>211 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow p-8 mx-auto w-full bg-white border border-solid border-zinc-200 max-md:px-5 max-md:mt-8">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/e57b45deb2682cce5a58cf305db08a9a649a670d500eea50efdda284691598e9?"
                    className="w-12 aspect-square"
                  />
                  <div className="mt-8 text-2xl  leading-7 text-slate-800">
                    Human Resource
                  </div>
                  <div className="flex gap-4 px-px mt-3 text-lg leading-7 text-slate-500">
                    <div>346 jobs available</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1883c3f970080ef24d10fc7219940fa5e85397d2971645cdf958557da632f345?"
                      className="shrink-0 my-auto w-6 aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center px-16  bg-white max-md:px-5">
        <div className="self-center mt-3 text-2xl font-semibold font-sans text-center text-teal-600 leading-[52.8px] max-md:text-4xl">
          <span className="text-maincolr ">How HyHire</span>{" "}
          <span className="text-black ">Work</span>
        </div>
        <div className="mt-14 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center items-center px-9 py-6 text-center rounded-xl border border-teal-600 border-solid max-md:px-5 max-md:mt-6">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbcb510b63933f010cc4a0c6c499b1e6296764c936652f7bb4c652cfb5157f27?"
                  className="aspect-square w-[72px]"
                />
                <div className="mt-8 text-lg font-medium leading-7 text-zinc-900">
                  Create account
                </div>

              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center items-center px-7 py-7 w-full text-center bg-white rounded-xl border border-teal-600 border-solid max-md:px-5 max-md:mt-6">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/66addd84685eace00e556fb605dff727bb6176520586a5aa4cd0efa63f9d9458?"
                  className="aspect-square w-[72px]"
                />
                <div className="mt-8 text-lg font-medium leading-7 text-zinc-900">
                  Upload CV/Resume
                </div>

              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center items-center px-9 py-6 text-center rounded-xl border border-teal-600 border-solid max-md:px-5 max-md:mt-6">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/4f2e83618ab83abd9a531d81bb01bad4e0602150b10d5edc9203e8eed3c7efa4?"
                  className="aspect-square w-[72px]"
                />
                <div className="mt-8 text-lg font-medium leading-7 text-zinc-900">
                  Find suitable job
                </div>

              </div>
            </div>
            <div className="flex flex-col ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-center items-center px-7 py-6 text-center rounded-xl border border-teal-600 border-solid max-md:px-5 max-md:mt-6">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8e93b3adbcfa6e0f7c2dffd0f9a6fdf02512fd1f66dbe71ec3b35067e798b25?"
                  className="aspect-square w-[72px]"
                />
                <div className="mt-8 text-lg font-medium leading-7 text-zinc-900">
                  Apply job
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col px-16 pt-3 my-5 pb-20 max-md:px-5">
        <div className="flex flex-col sm:flex-row justify-center items-center max-w-full w-full px-4 text-teal-600">
          <div className="flex text-2xl font-semibold  font-sans text-center mb-4 sm:mb-0">
            <span className="">Featured </span>
            <span className="text-black pl-2">jobs</span>
          </div>
        </div>
        <div className="flex 2xl:justify-end gap-2 px-2 justify-center md:justify-end sm:justify-end xl:justify-end  text-base font-semibold md:-mt-7 sm:-mt-7 lg:-mt-7 xl:-mt-7 2xl:-mt-7  ">
          <div className=" cursor-pointer text-maincolr">View All</div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f31d052956a032d9ec68bf0a0d33782d175bf0182a4ad2db4a522ef9d6f3bca1?apiKey=8f24705e21204f2584dbbee4857097d3&"
            className="shrink-0 w-6 aspect-square"
          />
        </div>
        <div className="mt-11 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-6 py-7 w-full rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                  <div className="text-lg font-medium leading-7 text-zinc-900">
                    Techical Support Specialist
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                      Part-time
                    </div>
                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                      Salary: $20,000 - $25,000
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/658d3db143a8f3e3b6b49f78a072a3d297b0563ed2700c85559ee196aaa14a9f?apiKey=8f24705e21204f2584dbbee4857097d3&"
                        className="w-6 aspect-square"
                      />
                    </div>
                    <div className="flex flex-col self-start mt-1.5">
                      <div className="text-base font-medium leading-6 text-zinc-900">
                        Google Inc.
                      </div>
                      <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?apiKey=8f24705e21204f2584dbbee4857097d3&"
                          className="shrink-0 aspect-square w-[18px]"
                        />
                        <div className="flex-auto">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a8fc9698fb77925ffcafb57a0256d3b02a3789871e877c671653a101a2d8f30?apiKey=8f24705e21204f2584dbbee4857097d3&"
                  className="shrink-0 self-end mt-20 w-6 aspect-square max-md:mt-10"
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-6 py-7 w-full rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                  <div className="text-lg font-medium leading-7 text-zinc-900">
                    Senior UX Designer
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                      Full-Time
                    </div>
                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                      Salary: $20,000 - $25,000
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/657a483ce04c952041e46b3f5dca5de432d2b5bc561ac21687888f7eeff78a0d?apiKey=8f24705e21204f2584dbbee4857097d3&"
                        className="w-6 aspect-square"
                      />
                    </div>
                    <div className="flex flex-col self-start mt-1.5">
                      <div className="text-base font-medium leading-6 text-zinc-900">
                        Google Inc.
                      </div>
                      <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?apiKey=8f24705e21204f2584dbbee4857097d3&"
                          className="shrink-0 aspect-square w-[18px]"
                        />
                        <div className="flex-auto">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a8fc9698fb77925ffcafb57a0256d3b02a3789871e877c671653a101a2d8f30?apiKey=8f24705e21204f2584dbbee4857097d3&"
                  className="shrink-0 self-end mt-20 w-6 aspect-square max-md:mt-10"
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-6 py-7 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                  <div className="text-lg font-medium leading-7 text-zinc-900">
                    Marketing Officer
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                      Internship
                    </div>
                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                      Salary: $20,000 - $25,000
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/6ecd024587a6b72d1c6c47c085ea580683fac06b3f4cb5815cec9a481fbdb8a1?apiKey=8f24705e21204f2584dbbee4857097d3&"
                        className="w-6 aspect-square"
                      />
                    </div>
                    <div className="flex flex-col self-start mt-1.5">
                      <div className="text-base font-medium leading-6 text-zinc-900">
                        Google Inc.
                      </div>
                      <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?apiKey=8f24705e21204f2584dbbee4857097d3&"
                          className="shrink-0 aspect-square w-[18px]"
                        />
                        <div className="flex-auto">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a8fc9698fb77925ffcafb57a0256d3b02a3789871e877c671653a101a2d8f30?apiKey=8f24705e21204f2584dbbee4857097d3&"
                  className="shrink-0 self-end mt-20 w-6 aspect-square max-md:mt-10"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0">
            <div className="flex flex-col w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-6 py-7 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                  <div className="text-lg font-medium leading-7 text-zinc-900">
                    Junior Graphic Designer
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                      Internship
                    </div>
                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                      Salary: $20,000 - $25,000
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/cae43cf95192d2bcaeb9e2d0b0143fddbf335ed4f79ba360f7c2d8e683f3785c?apiKey=8f24705e21204f2584dbbee4857097d3&"
                        className="w-6 aspect-square"
                      />
                    </div>
                    <div className="flex flex-col self-start mt-1.5">
                      <div className="text-base font-medium leading-6 text-zinc-900">
                        Google Inc.
                      </div>
                      <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?apiKey=8f24705e21204f2584dbbee4857097d3&"
                          className="shrink-0 aspect-square w-[18px]"
                        />
                        <div className="flex-auto">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a8fc9698fb77925ffcafb57a0256d3b02a3789871e877c671653a101a2d8f30?apiKey=8f24705e21204f2584dbbee4857097d3&"
                  className="shrink-0 self-end mt-20 w-6 aspect-square max-md:mt-10"
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-6 py-7 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                  <div className="text-lg font-medium leading-7 text-zinc-900">
                    Interaction Designer
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                      Part-time
                    </div>
                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                      Salary: $20,000 - $25,000
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/265771c61a7ebc186cdf2d6b70ff3a8535cd95b835cbbefac74c63e92715ed54?apiKey=8f24705e21204f2584dbbee4857097d3&"
                        className="w-6 aspect-square"
                      />
                    </div>
                    <div className="flex flex-col self-start mt-1.5">
                      <div className="text-base font-medium leading-6 text-zinc-900">
                        Google Inc.
                      </div>
                      <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?apiKey=8f24705e21204f2584dbbee4857097d3&"
                          className="shrink-0 aspect-square w-[18px]"
                        />
                        <div className="flex-auto">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a8fc9698fb77925ffcafb57a0256d3b02a3789871e877c671653a101a2d8f30?apiKey=8f24705e21204f2584dbbee4857097d3&"
                  className="shrink-0 self-end mt-20 w-6 aspect-square max-md:mt-10"
                />
              </div>
            </div>
            <div className="flex flex-col ml-5 w-[33%] max-md:ml-0 max-md:w-full">
              <div className="flex grow gap-5 justify-center px-6 py-7 w-full bg-white rounded-lg border border-solid shadow-sm border-zinc-200 max-md:flex-wrap max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="flex flex-col grow shrink-0 basis-0 w-fit">
                  <div className="text-lg font-medium leading-7 text-zinc-900">
                    Project Manager
                  </div>
                  <div className="flex gap-2 mt-2.5">
                    <div className="justify-center px-2 py-1 text-xs font-semibold leading-3 text-green-600 uppercase whitespace-nowrap bg-green-100 rounded">
                      Full-Time
                    </div>
                    <div className="flex-auto my-auto text-sm leading-5 text-gray-500">
                      Salary: $20,000 - $25,000
                    </div>
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div className="flex flex-col justify-center items-start p-3 bg-gray-100 rounded max-md:pr-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/33ef82ab85def0488a4ee71c81a545a3ad397dfca2bec4551ccd8ec68a2af430?apiKey=8f24705e21204f2584dbbee4857097d3&"
                        className="w-6 aspect-square"
                      />
                    </div>
                    <div className="flex flex-col self-start mt-1.5">
                      <div className="text-base font-medium leading-6 text-zinc-900">
                        Google Inc.
                      </div>
                      <div className="flex gap-1 mt-2 text-sm leading-5 text-gray-500">
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5752ef17b1e9e46a64fcc8e07a8b95e24827aeca8a9ba7194e220edbc0d45fb?apiKey=8f24705e21204f2584dbbee4857097d3&"
                          className="shrink-0 aspect-square w-[18px]"
                        />
                        <div className="flex-auto">Dhaka, Bangladesh</div>
                      </div>
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a8fc9698fb77925ffcafb57a0256d3b02a3789871e877c671653a101a2d8f30?apiKey=8f24705e21204f2584dbbee4857097d3&"
                  className="shrink-0 self-end mt-20 w-6 aspect-square max-md:mt-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='2xl:px-52  pb-10 px-10 sm:px-15 md:px-36 '>
        <img
          className='w-full '
          style={{ borderRadius: '1rem' }}
          src={workerimage}
          alt="worker image"
        />
      </div>
      {/* <Footer />    */}
    </div>

  );
};

