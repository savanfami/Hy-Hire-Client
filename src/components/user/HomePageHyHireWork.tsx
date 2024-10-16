import React from 'react';

interface SlideData {
  image: string;
  title: string;
}

const sliderData: SlideData[] = [
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/fbcb510b63933f010cc4a0c6c499b1e6296764c936652f7bb4c652cfb5157f27?",
    title: "Create account"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/66addd84685eace00e556fb605dff727bb6176520586a5aa4cd0efa63f9d9458?",
    title: "Upload CV/Resume"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/4f2e83618ab83abd9a531d81bb01bad4e0602150b10d5edc9203e8eed3c7efa4?",
    title: "Find suitable job"
  },
  {
    image: "https://cdn.builder.io/api/v1/image/assets/TEMP/d8e93b3adbcfa6e0f7c2dffd0f9a6fdf02512fd1f66dbe71ec3b35067e798b25?",
    title: "Apply job"
  }
];

export const HomePageHyHireWork: React.FC = () => {
  return (
    <div className="flex flex-col justify-center px-16 bg-white max-md:px-5">
      <div className="self-center mt-3 text-2xl font-semibold font-sans text-center text-teal-600 leading-[52.8px] max-md:text-4xl">
        <span className="text-maincolr">How HyHire</span>{" "}
        <span className="text-black">Work</span>
      </div>
      <div className="slider-container  mt-14  max-md:mt-10 max-md:max-w-full">
        <div className="slider">
          {[...sliderData, ...sliderData].map((slide, index) => (
            <div key={index} className="slide">
              <img
                loading="lazy"
                src={slide.image}
                className="aspect-square  w-[72px]"
                alt={slide.title}
              />
              <div className="mt-8 text-lg font-medium leading-7 text-zinc-900">
                {slide.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      <></>
      <style>{`
        .slider-container {
          width: 100%;
          overflow: hidden;
        }
        .slider {
          display: flex;
          animation: slide 20s linear infinite;
          gap: 20px; 
        
        }
        .slide {
          flex: 0 0 25%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          box-sizing: border-box;
          border: 1px solid #0D9488; /* Teal-600 color */
          border-radius: 0.75rem; /* Rounded-xl */
          margin: 0 10px;
        }
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @media (max-width: 768px) {
          .slide {
            flex: 0 0 50%;
          }
        }
        @media (max-width: 480px) {
          .slide {
            flex: 0 0 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default HomePageHyHireWork;