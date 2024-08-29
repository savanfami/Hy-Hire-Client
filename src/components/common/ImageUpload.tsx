import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

type ImageFile = {
  preview: string;
  file: File;
};

interface ImageUploadProps {
  multiple?: boolean;
  onUpload: (files: ImageFile[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ multiple = false, onUpload }) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const validExtensions = ['image/jpeg', 'image/png', 'image/jpg'];

    const newImages = acceptedFiles.map((file) => {
      if (!validExtensions.includes(file.type)) {
        setError('Only PNG, JPG, and JPEG files are allowed.');
        return null;
      }

      setError(null);
      return {
        file,
        preview: URL.createObjectURL(file),
      };
    }).filter(Boolean) as ImageFile[];

    setImages((prev) => (multiple ? [...prev, ...newImages] : newImages));
  }, [multiple]);

  const deleteImage = (preview: string) => {
    setImages((prev) => prev.filter((img) => img.preview !== preview));
  };

  useEffect(() => {
    onUpload(images);
  }, [images, onUpload]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    multiple,
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="flex justify-center items-center w-[70%] h-32 border-2 border-dashed border-maincolr rounded-lg cursor-pointer"
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Drag & drop {multiple ? 'images' : 'an image'} here, or click to select
        </p>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative w-24 h-24">
            <img
              src={image.preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
            <button
              onClick={() => deleteImage(image.preview)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
