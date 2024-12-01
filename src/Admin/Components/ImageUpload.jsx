import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

 // Optional icon for clearing the image
import { Button } from '@/components/ui/button';
import { CrossIcon } from 'lucide-react';

const ImageUpload = ({img,setImg,required}) => {

  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      // Optionally, upload the image to a server or handle it here
      // You can call onImageUpload(file) if necessary

      setImg(file)

    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: 1,
  });

  const handleClear = () => {
    setImagePreview(null);
    // Handle clearing uploaded image logic
    setImg(null)
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className="flex justify-center items-center border-dashed border-2 border-gray-300 rounded-lg p-8 cursor-pointer hover:border-gray-500 transition"
      >
        {
          required? 
          <input required {...getInputProps()} /> :<input  {...getInputProps()} /> 
        }
        {!imagePreview | img ? (
          <span className="text-gray-500">Drag & Drop an Image or Click to Select</span>
        ) : (
          <div className="relative">
            <img src={imagePreview} alt="Image Preview" className="w-48 h-48 object-cover rounded-lg" />
            <Button
              onClick={handleClear}
              className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-full"
            >
             <CrossIcon />
            </Button>
          </div>
        )}
      </div>
      <Button
        className="w-full mt-4"
        onClick={() => setIsUploading(true)} // Implement image upload functionality
        disabled={isUploading || !imagePreview}
      >
        {isUploading ? 'Uploading...' : 'Upload Image'}
      </Button>
    </div>
  );
};

export default ImageUpload;
