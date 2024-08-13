import React, { useState } from 'react';
import logo from '../../assets/images/Group_1172__1_-removebg-preview.png'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const JoinAs = () => {
  const [selected, setSelected] = useState<string|null>(null);
  const navigate=useNavigate()

  const handleSelect = (type:string) => {
    setSelected(type);
  };

  const handleJoinAs  = () => {
    if (selected === 'jobseeker') {
      navigate('/signup', {
        state: { userType: 'user' }
      });
    } else if (selected === 'hiringteam') {
      navigate('/companysignup', {
        state: { userType: 'company' }
      })
    }
  };

  return (
    <div className='h-1'>
      <div className="flex flex-col h-screen bg-gray-200 ">
        <div className="p-4">
          <Link to='/'>  <img  src={logo} className='w-52 h-auto' alt="Logo" /></Link>
        </div>
        <div className='flex-grow flex justify-center h-screen items-center'>
          <div className="flex flex-col items-center px-5 max-w-[492px] w-full">
            <div className="w-full text-3xl font-gg  font-bold text-center mb-8">
              Join as a Jobseeker or HiringTeam
            </div>
            <div className="w-full flex flex-col md:flex-row gap-5 mb-8">
              <div
                className={`flex flex-col border border-black grow pt-3 pr-3 pb-8 pl-6 w-full md:w-1/2 rounded shadow-sm cursor-pointer transition-colors duration-300 ${
                  selected === 'jobseeker' ? 'bg-stone-50' : 'bg-white'
                }`}
                onClick={() => handleSelect('jobseeker')}
              >
                <div className="flex gap-5 justify-between items-start px-0.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/24818681e818d5d2e3665182e6968c24103238c88974da037bc8619cb4b1e504?apiKey=8f24705e21204f2584dbbee4857097d3&"
                    className="shrink-0 mt-3.5 w-6 aspect-square"
                  />
                </div>
                <div className="mt-7 text-xl leading-6 text-zinc-900">
                  I'm a jobseeker, looking <br />
                  for a job
                </div>
              </div>
              <div
                className={`flex flex-colborder border border-black grow pt-3 pr-3 pb-8 pl-6 w-full md:w-1/2 rounded shadow-sm cursor-pointer transition-colors duration-300 ${
                  selected === 'hiringteam' ? 'bg-stone-50' : 'bg-white'
                }`}
                onClick={() => handleSelect('hiringteam')}
              >
                <div className="flex gap-5 justify-between items-start px-0.5">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/08cffa300d7472b59ca61f9ec63f9b3c54438769d4fd7e385ce772721f001c6a?apiKey=8f24705e21204f2584dbbee4857097d3&"
                    className="shrink-0 mt-3.5 w-6 aspect-square"
                  />
                </div>
                <div className="mt-7 text-xl leading-6 text-zinc-900">
                  I'm a HiringManager,
                  <br />
                  looking for candidates
                </div>
              </div>
            </div>
            <button onClick={handleJoinAs} 
              className={`px-7 py-3 text-sm leading-5 rounded-2xl transition-colors duration-300 ${
                selected ? 'bg-green-700 text-white' : 'bg-gray-300 text-gray-600'
              }`}
            >
              Join as a {selected || 'user'}
            </button>
            <div className="mt-5  font-semibold text-sm leading-5 text-gray-600">
              Already have an account? <br />
              <Link to="/login" > <p className='text-center mt-2 cursor-pointer underline text-black'> Back to Login </p><br /></Link>
          
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAs;