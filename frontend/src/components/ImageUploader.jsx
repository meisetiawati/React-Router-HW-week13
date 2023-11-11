import React, { useState, useEffect, useRef } from 'react';

export default function ImageUploader({ bookData, setBookData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (bookData?.image) {
      setSelectedImage(URL.createObjectURL(bookData.image));
      fileInputRef.current.value = '';
    }
  }, [bookData]);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));

    setBookData((prevData) => ({
      ...prevData,
      image: file,
    }));
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        required
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {selectedImage && <img src={selectedImage} alt="Selected Image" />}
    </div>
  );
}
