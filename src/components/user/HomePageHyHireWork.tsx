import React from 'react'

export const HomePageHyHireWork = () => {
  return (
   <>
    <div className="flex flex-col justify-center px-16  bg-white max-md:px-5">
        <div className="self-center mt-3 text-2xl font-semibold font-sans text-center text-teal-600 leading-[52.8px] max-md:text-4xl">
          <span className="text-maincolr ">How HyHire</span>{" "}
          <span className="text-black ">Work</span>
        </div>
        <div data-aos="fade-up" className="mt-14 max-md:mt-10 max-md:max-w-full">
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
   </>
  )
}

