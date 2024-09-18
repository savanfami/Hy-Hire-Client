import React, { useState,  useEffect } from "react";
 import { MdDelete } from "react-icons/md";
import { CropBackdrop } from "./CropBackDrop";
 
// const ErrorAlert: React.FC = () => {
//   return (
//     <div role="alert" className="alert alert-error absolute rounded-none max-w-44 p-1 top-5 right-1">
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6 shrink-0 stroke-current"
//         fill="none"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth="2"
//           d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
//         />
//       </svg>
//       <span>Please Try Again</span>
//     </div>
//   );
// };
interface ImagePreviewProp {
  defaultImg: string
  preview: boolean
  removeSelectedImage: () => void
  updateSelectedImage: (ur: string) => void
  aspectInit?: number;
  isCloudinaryImg?: boolean
}
const ImagePreview: React.FC<ImagePreviewProp> = ({ defaultImg, preview, removeSelectedImage, updateSelectedImage, aspectInit, isCloudinaryImg }) => {
  const [images, setImages] = useState<string | null>(null);//store the dataURL 
  const [selected, setSelected] = useState<string | null>(null);//for showing the cropper ui
  const removePreview = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setImages(null)
    removeSelectedImage()
  };

  const onCancel = () => {
      removeSelectedImage()
    setSelected(null)
  }

  useEffect(() => {
    if (!isCloudinaryImg) {
      setSelected(defaultImg)
    }else{
      setImages(defaultImg)
    }
  }, [])

  const setCroppedImageFor = (croppedImageUrl: string) => {
    if (preview) {
      setImages(croppedImageUrl);
    }

    updateSelectedImage(croppedImageUrl)

    setSelected(null)
  };
  return (
    <>
      <div className="relative">
        <div className="relative">
          {selected &&
            <CropBackdrop
              imgURL={selected}
              onCancel={onCancel}
              setCroppedImageFor={setCroppedImageFor}
              aspectInit={aspectInit}
            />}

          {images && preview && (
            <div className={` mt-2 ${aspectInit == 1000 / 300 ? "   w-full " : "w-[280px] h-[420px]"} relative `}>
              <img src={images} className=" h-full w-full object-contain  rounded-md" />
              <>
                <button
                  className="absolute rounded-full bg-white bottom-[-1%] right-[-1%] glass  z-20 "
                  onClick={(e) => removePreview(e)}
                >
                  <MdDelete className="text-black" size={22} />
                </button>
              </>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImagePreview;