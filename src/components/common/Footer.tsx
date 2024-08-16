import React from "react"

const Footer = () => {
  return (
    <div className="flex  overflow-x-hidden flex-col px-16 pb-2 font-sans bg-black max-md:px-5">
    <div className="flex flex-wrap justify-between items-start self-center mt-8 w-full text-base max-w-[1250px] max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-col text-xl w-full sm:w-1/4 mb-8 sm:mb-0">
        <div className="flex gap-2 font-medium text-white whitespace-nowrap">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/3890b1fc283caf5a45928468b3231832e60c539601520154a8561fb26975733d?apiKey=8f24705e21204f2584dbbee4857097d3&"
            className="shrink-0 self-start aspect-[1.49] w-[27px]"
          />
          <div className="flex-auto">HyHire</div>
        </div>
        <div className="mt-7 font-semibold leading-8 text-ellipsis text-white text-opacity-80">
          "Don't wait for the right opportunity: Create it"
        </div>
      </div>
      <div className="flex flex-col mt-1 text-white leading-[162.5%] w-full sm:w-1/5 mb-8 sm:mb-0">
        <div className="text-xl font-semibold">Company</div>
        <div className="mt-6">About Us</div>
        <div className="mt-4">Our Team</div>
        <div className="mt-4">Partners</div>
        <div className="mt-4">For Candidates</div>
        <div className="mt-4">For Employers</div>
      </div>
      <div className="flex flex-col mt-1 text-white w-full sm:w-1/5 mb-8 sm:mb-0">
        <div className="text-xl font-semibold">Job Categories</div>
        <div className="mt-6">Telecommunications</div>
        <div className="mt-4">Hotels & Tourism</div>
        <div className="mt-4">Construction</div>
        <div className="mt-4">Education</div>
        <div className="mt-4">Financial Services</div>
      </div>
      <div className="flex flex-col mt-1 text-sm w-full sm:w-1/4">
        <div className="text-xl font-semibold text-white">
          Get Job notifications
        </div>
        <div className="mt-5 leading-4 text-ellipsis text-white text-opacity-80">
          The latest job news, articles sent to your inbox weekly
        </div>
        <input type='email' placeholder='enter email' className="justify-center items-start px-5 py-5 mt-3.5 rounded-xl max-md:px-5" />
        <button className="justify-center items-center py-5 mt-4 text-base font-bold text-white bg-teal-600 rounded-xl max-md:px-5">
          Subscribe now
        </button>
      </div>
    </div>
    <div className="flex flex-col sm:flex-row justify-between items-center mt-5 w-full max-md:mt-10 max-md:max-w-full">
      <div className="text-sm leading-7 text-white text-opacity-50  sm:mb-0">
        © Copyright HyHire
      </div>
      <div className="flex gap-5 text-base  text-white">
        <div className="underline">Privacy Policy</div>
        <div className="underline">Terms & Conditions</div>
      </div>
    </div>
  </div>
  )
}

export default Footer
