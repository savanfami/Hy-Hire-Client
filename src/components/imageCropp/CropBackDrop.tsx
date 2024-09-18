import React, { MouseEvent, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { croppedImage } from "./imageCrop";
import { ImCheckmark, ImCross } from "react-icons/im";

interface CropBackdropProps {
  imgURL: string;
  cropInit?: { x: number; y: number };
  zoomInit?: number;
  aspectInit?: number;
  onCancel: () => void;
  setCroppedImageFor: (croppedImageUrl: string) => void;
}

export const CropBackdrop: React.FC<CropBackdropProps> = ({
  imgURL,
  aspectInit = 6 / 3,
  zoomInit = 1,
  cropInit = { x: 0, y: 0 },
  onCancel,
  setCroppedImageFor
}) => {
  const [zoom, setZoom] = useState<number>(zoomInit);
  const [crop, setCrop] = useState<{ x: number; y: number }>(cropInit);
  const [aspect] = useState<number>(aspectInit);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);

  const onCropChange = (crop: { x: number; y: number }) => {
    setCrop(crop);
  };

  const cancelCrop = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  const onZoomChange = (newZoom: number) => {
    setZoom(newZoom);
  };

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onCrop = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (croppedArea) {
      const croppedImageUrl = await croppedImage(imgURL, croppedArea);
      setCroppedImageFor(croppedImageUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-full h-full top-14 max-w-4xl max-h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="absolute inset-0">
          <Cropper
            image={imgURL}
            zoom={zoom}
            crop={crop}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropComplete}
            aspect={aspect}
            style={{
              containerStyle: { width: '100%', height: '100%' },
              mediaStyle: { width: 'auto', height: 'auto' },
            }}
          />
        </div>
        <div className="absolute  bottom-0 left-0  right-0 flex justify-between items-center p-4 bg-gradient-to-t from-black to-transparent">
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => onZoomChange(Number(e.target.value))}
            className="w-1/2 hidden md:block h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex gap-2">
            <button
              onClick={onCrop}
              className="px-4 py-2 bg-maincolr text-white rounded-md  font-gg transition-colors duration-200 flex items-center"
            >
              <ImCheckmark className="mr-2" /> Crop
            </button>
            <button
              onClick={cancelCrop}
              className="px-4 py-2  bg-maincolr text-white rounded-md font-gg transition-colors duration-200 flex items-center"
            >
              <ImCross className="mr-2" /> Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};