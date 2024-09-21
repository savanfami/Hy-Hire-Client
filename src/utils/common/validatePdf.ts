import React from "react";
import { toast } from 'react-toastify'
const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/rtf', 'text/html', 'application/vnd.oasis.opendocument.text'];



export function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): File | false {
    const file = event.target.files?.[0];
    if (file) {
        const fileType = file.type;
        if (allowedTypes.includes(fileType)) {
            // Proceed with file upload
            return file
            // You can handle the file upload here
        } else {
            // Show error or alert
            toast.error("Invalid file type. Please upload a valid file.", {
                position: 'top-center'
            });
            return false
        }
    } else {
        return false
    }
}

