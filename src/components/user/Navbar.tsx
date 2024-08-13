
export const Navbar=() =>{
return (
  <div className="flex overflow-hidden flex-wrap gap-10 justify-center p-2 bg-white shadow-sm max-md:px-5">
    {/* <div className="my-auto text-3xl italic leading-tight text-slate-800">
      Messages
    </div> */}
    <div className="flex gap-8 justify-center items-center p-1 text-base font-bold leading-relaxed font-serif text-center text-maincolr">
      <div className="gap-2.5 self-stretch px-6 py-3 my-auto border border-indigo-200 border-solid w-[213px] max-md:px-5">
        Back to homepage
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/2a0c13b89bdcd69d6a109708295cd7f96cc4cda5271cf06e9c5d2bb5c7bf8a6f?placeholderIfAbsent=true&apiKey=8f24705e21204f2584dbbee4857097d3"
        className="object-contain shrink-0 self-stretch my-auto w-10 aspect-square"
      />
    </div>
  </div>
);
}