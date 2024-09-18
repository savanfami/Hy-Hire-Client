import axios from "axios";

const CLOUDINARY_URL=import.meta.env.VITE_CLOUDINARY_URL as string
// console.log(CLOUDINARY_URL)
export const uploadToCloudinary = async (file: any): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hy-hire');
   


    try {
        const response = await axios.post(
            CLOUDINARY_URL,
            formData
        );
        // console.log(response.data)
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
};