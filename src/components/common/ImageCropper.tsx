// import React, { useState, useCallback } from 'react';
// import Cropper from 'react-easy-crop';
// import { Button } from '../../components/ui/button';

// const createImage = (url) =>
//   new Promise((resolve, reject) => {
//     const image = new Image();
//     image.addEventListener('load', () => resolve(image));
//     image.addEventListener('error', (error) => reject(error));
//     image.setAttribute('crossOrigin', 'anonymous');
//     image.src = url;
//   });

// const getCroppedImg = async (imageSrc, pixelCrop) => {
//   const image = await createImage(imageSrc);
//   const canvas = document.createElement('canvas');
//   canvas.width = pixelCrop.width;
//   canvas.height = pixelCrop.height;
//   const ctx = canvas.getContext('2d');

//   ctx.drawImage(
//     image,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   );

//   return new Promise((resolve) => {
//     canvas.toBlob((blob) => {
//       resolve(URL.createObjectURL(blob));
//     }, 'image/jpeg');
//   });
// };

// export const ImageCropper = () => {
//   const [imageSrc, setImageSrc] = useState(null);
//   const [crop, setCrop] = useState({ x: 0, y: 0 });
//   const [zoom, setZoom] = useState(1);
//   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
//   const [croppedImage, setCroppedImage] = useState(null);

//   const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
//     setCroppedAreaPixels(croppedAreaPixels);
//   }, []);

//   const showCroppedImage = useCallback(async () => {
//     try {
//       const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
//       setCroppedImage(croppedImage);
//     } catch (e) {
//       console.error(e);
//     }
//   }, [imageSrc, croppedAreaPixels]);

//   const onFileChange = async (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       let imageDataUrl = await readFile(file);
//       setImageSrc(imageDataUrl);
//     }
//   };

//   const readFile = (file) => {
//     return new Promise((resolve) => {
//       const reader = new FileReader();
//       reader.addEventListener('load', () => resolve(reader.result), false);
//       reader.readAsDataURL(file);
//     });
//   };

//   return (
//     <div className="ImageCropper">
//       <input type="file" accept="image/*" onChange={onFileChange} />
//       {imageSrc ? (
//         <div className="relative h-[400px]">
//           <Cropper
//             image={imageSrc}
//             crop={crop}
//             zoom={zoom}
//             aspect={4 / 3}
//             onCropChange={setCrop}
//             onCropComplete={onCropComplete}
//             onZoomChange={setZoom}
//           />
//         </div>
//       ) : null}
//       <Button onClick={showCroppedImage} className="mt-4">Show Result</Button>
//       {croppedImage && (
//         <div className="mt-4">
//           <h3>Cropped Image:</h3>
//           <img src={croppedImage} alt="Cropped" className="max-w-full h-auto" />
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageCropper;