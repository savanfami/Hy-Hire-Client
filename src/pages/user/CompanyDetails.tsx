import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const CompanyDetail = () => {
  return (
    <div className="container mx-auto px-4 py-8 ml-0">
      <div className="flex flex-col md:flex-row items-center gap-6 mt-10">
        <img 
          loading="lazy"
          srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/6fdc7cc46242ce54e9287c3aedfa986f21bd21c045c5cf1ce53fe1c47ee54394?apiKey=c721d257b1b04fddbe0f725293ce8048&"
          className="object-contain w-[189px] h-[189px] md:ml-0 lg:ml-44"
        />
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="text-4xl md:text-5xl italic leading-none font-gg">
                Stripe
              </div>
              <div className="px-3 py-1 text-base leading-relaxed text-center text-teal-600 border border-teal-600 border-solid">
                43 Jobs
              </div>
            </div>
            <div className="mt-3 text-base font-semibold leading-relaxed text-teal-600">
              https://stripe.com
            </div>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-10 items-start mt-6">
            {[
              { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a74f0865b1e8a0476abce2073ceccbadd361a64511a430b1f09884cc7e8b0bc3?apiKey=c721d257b1b04fddbe0f725293ce8048&", title: "Founded", value: "July 31, 2011" },
              { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/fdb3057de9ae7f2270edc999b1710752f4c173f0d79f39524a597ec47c1edfa6?apiKey=c721d257b1b04fddbe0f725293ce8048&", title: "Employees", value: "4000+" },
              { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/63e17c9becfeb1e95f13ad6037d26d2864566d21e479b48681fc75d0ca295977?apiKey=c721d257b1b04fddbe0f725293ce8048&", title: "Location", value: "20 countries" },
              { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6102e43fafc075e2024da98acd1db00287bb82bdedc498c070f060331ab210bd?apiKey=c721d257b1b04fddbe0f725293ce8048&", title: "Industry", value: "Payment Gateway" },
            ].map((item, index) => (
              <div key={index} className="flex gap-4 items-center">
                <div className="flex gap-2.5 items-center justify-center p-2.5 w-11 h-11 bg-white rounded-full">
                  <img
                    loading="lazy"
                    src={item.icon}
                    className="object-contain w-6 aspect-square"
                    alt={item.title}
                  />
                </div>
                <div className="flex flex-col text-base leading-relaxed">
                  <div className="text-slate-600">{item.title}</div>
                  <div className="font-semibold font-gg">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-start text-base leading-tight  font-gg md:ml-0 lg:ml-44">
        <div className="text-3xl italic">Company Profile</div>
     
        <div className="mt-4 leading-7 italic text-slate-600 ">
          Stripe is a software platform for starting and running internet
          businesses. Millions of businesses rely on Stripe's software tools to
          accept payments, expand globally, and manage their businesses online.
          Stripe has been at the forefront of expanding internet commerce,
          powering new business models, and supporting the latest platforms, from
          marketplaces to mobile commerce sites. We believe that growing the GDP
          of the internet is a problem rooted in code and design, not finance.
          Stripe is built for developers, makers, and creators. We work on solving
          the hard technical problems necessary to build global economic
          infrastructure—from designing highly reliable systems to developing
          advanced machine learning algorithms to prevent fraud.
        </div>
          
           
       
        
        <div className="mt-6 text-3xl italic">Contact</div>
        <div className="flex flex-wrap gap-4 mt-4 font-medium leading-relaxed text-teal-600">
          {[
            { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e389c334d03580ad29183185a2c3125fc5b29fcdfea51fbd8d795a1a209f3fa5?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048", text: "twitter.com/stripe" },
            { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2eb8598f9110ce8069cac51e72d415ba020b18a01252db5adf073e14e8f4040d?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048", text: "facebook.com/StripeHQ" },
            { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c9d7e47374bcd751211f995f1a88eb7bd917cf2bed0142448f73a7f322d18d0d?placeholderIfAbsent=true&apiKey=c721d257b1b04fddbe0f725293ce8048", text: "linkedin.com/company/stripe" },
          ].map((item, index) => (
            <div key={index} className="flex gap-4 p-2 border border-teal-600 border-solid">
              <img
                loading="lazy"
                src={item.icon}
                className="object-contain shrink-0 self-start w-6 aspect-square"
                alt={`Social icon ${index + 1}`}
              />
              <div className="basis-auto">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className='flex justify-between'>
        <h1 className='mt-6 flex justify-center md:justify-start text-3xl italic font-gg md:ml-44'>Open Positions</h1>
        <h1 className='text-maincolr font-gg mt-8 md:mt-6'>show all jobs <ArrowForwardIcon className='text-maincolr'/></h1>
      </div>

      {/* <div className="flex   gap-2.5 my-auto text-base font-semibold leading-6  mr-44 md:mr-44 justify-end">
          <div className="my-auto  cursor-pointer text-maincolr">Show all jobs</div>  
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c51a738af9200d73eeb5bf69e0c9fd1e8e4b33a3ad95b27a9a9a9348ba14dbdc?"
            className="shrink-0 w-6 aspect-square"
          />
        </div> */}
    </div>
  )
}