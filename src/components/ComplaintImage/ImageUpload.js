import React, { useEffect, useState } from "react";
import Compress from "compress.js";

const compress = new Compress();

export default function ImageUpload({ onChange, src }) {
  const [url, setUrl] = useState(src);

  const handleImageChange = async (e) => {
    if (e.target.files.length === 0) return;

    const file = e.target.files[0];
    console.log("file is ", file);
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      console.log("Invalid file type");
      onChange(null);
      return;
    }
    const options = {
      quality: 0.95,
      size: 2,
      maxWidth: 320, //   Image width will not exceed 320px.
      maxHeight: 320, // Image height will not exceed 320px.
    };

    const newFile = await compress.compress(file, options);

    onChange(newFile);
    setUrl(URL.createObjectURL(newFile));
  };

  const handleDef = (e) => e.preventDefault();

  async function handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files?.length <= 0) return;

    const file = e.dataTransfer.files[0];
    // const fileType = file.type.split("/")[0];

    // if (fileType !== "image") return;

    const newFile = await compress.compress(file, {
      quality: 0.95,
      size: 2,
      // crop: true, // If true, will crop a square image from the center.
      maxWidth: 320, // Image width will not exceed 320px.
      maxHeight: 320, // Image height will not exceed 320px.
    });

    onChange(newFile);
    setUrl(URL.createObjectURL(newFile));
  }

  return (
    <label
      htmlFor="complaint-image"
      onDragOver={handleDef}
      onDragLeave={handleDef}
      onDrop={handleDrop}
    >
      <div>
        <h3 className="text-sm text-gray-600 mb-1">Image</h3>
        <input
          className="border rounded px-3 py-2 w-full"
          onChange={handleImageChange}
          type="file"
          name="image"
          id="complaint-image"
          accept="image/*"
        />
        {url && (
          <img
            className="size-32 object-contain mt-2 object-left"
            src={url}
            alt=""
          />
        )}
      </div>
    </label>
  );
}
