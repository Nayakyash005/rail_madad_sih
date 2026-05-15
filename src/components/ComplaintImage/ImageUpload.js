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
      size: 0.1,
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
      className="w-full"
    >
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-gray-700">Upload File</h3>

        <div className="w-full border border-gray-300 rounded-lg overflow-hidden bg-white">
          <div className="flex flex-col sm:flex-row w-full">
            {/* File Name */}
            <div className="flex-1 px-4 py-3 text-gray-500 truncate text-sm sm:text-base">
              {url ? "Image selected" : "Select your file"}
            </div>

            {/* Browse Button */}
            <label
              htmlFor="complaint-image"
              className="rounded-r-lg border-l border-[#d8d3e8] bg-[#f3f0ff] text-gray-800 hover:bg-[#7a183c] hover:text-white transition-all duration-200 font-medium px-6 py-3 text-center whitespace-nowrap cursor-pointer"
            >
              Browse
            </label>

            <input
              onChange={handleImageChange}
              type="file"
              name="image"
              id="complaint-image"
              accept="image/*"
              className="hidden"
            />
          </div>
        </div>

        <p className="text-xs text-gray-400">
          only PDF, JPG, JPEG, PNG, MP4 up to 5 MB
        </p>

        {url && (
          <div className="mt-2 border rounded-xl p-2 bg-gray-50 w-fit">
            <img
              className="w-32 h-32 object-contain rounded-lg"
              src={url}
              alt=""
            />
          </div>
        )}
      </div>
    </label>
  );

  // return (
  //   <label
  //     htmlFor="complaint-image"
  //     onDragOver={handleDef}
  //     onDragLeave={handleDef}
  //     onDrop={handleDrop}
  //   >
  //     <div>
  //       <h3 className="text-sm text-gray-600 mb-1">Image</h3>
  //       <input
  //         className="border rounded px-3 py-2 w-full"
  //         onChange={handleImageChange}
  //         type="file"
  //         name="image"
  //         id="complaint-image"
  //         accept="image/*"
  //       />
  //       {url && (
  //         <img
  //           className="size-32 object-contain mt-2 object-left"
  //           src={url}
  //           alt=""
  //         />
  //       )}
  //     </div>
  //   </label>
  // );
}
