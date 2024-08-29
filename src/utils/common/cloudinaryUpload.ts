import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'hy-hire');


    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/dbfpk9qoh/image/upload`,
            formData
        );
        console.log(response.data)
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Failed to upload image');
    }
};