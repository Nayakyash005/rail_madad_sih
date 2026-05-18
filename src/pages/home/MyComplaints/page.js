import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { getStatusColor } from "../../../lib/utils";
import { getMyComplaints } from "../../../requests/complaint";
import { Link } from "react-router-dom";

// const ComplaintCard = (complaint) => (
//   <Link
//     key={complaint._id}
//     to={`/my-complaints/${complaint._id}`}
//     className="flex flex-col sm:grid sm:grid-cols-4 gap-4 p-4 md:p-5 md:items-center bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-[#7B1034]/20 transition-all duration-200"
//   >
//     <div className="w-full sm:size-28 sm:min-w-28 md:size-32 md:min-w-32 justify-self-center rounded-xl overflow-hidden bg-gray-50 border">
//       <img
//         className="h-full w-full object-cover"
//         src={complaint.image_url}
//         alt=""
//       />
//     </div>

//     <div className="flex flex-col justify-center px-1 sm:px-2 col-span-2">
//       <div className="flex sm:hidden items-center gap-2 mb-2 text-sm font-medium text-[#7B1034]">
//         <FaCircle className="size-2" color={getStatusColor(complaint.status)} />
//         <p>{complaint.status}</p>
//       </div>
//       <h2 className="text-sm text-gray-600">
//         Registered on{" "}
//         <span className="font-semibold text-[#7B1034]">
//           {new Date(complaint.createdAt).toLocaleDateString("en-UK", {
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//           })}
//         </span>
//       </h2>
//       <div className="line-clamp-2 text-gray-700 mt-2 text-sm sm:text-base">
//         {complaint.description}
//       </div>
//     </div>

//     <div className="hidden sm:flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#f8f4f6] text-[#7B1034] w-fit min-w-fit justify-self-center">
//       <FaCircle className="size-3" color={getStatusColor(complaint.status)} />
//       <p>{complaint.status}</p>
//     </div>
//   </Link>
// );

// const ComplaintCard = (complaint) => (
//   <Link
//     key={complaint._id}
//     to={`/my-complaints/${complaint._id}`}
//     className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#7B1034]/30 hover:shadow-md transition-all duration-200"
//   >
//     {/* Image */}
//     <div className="size-20 sm:size-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
//       <img
//         className="h-full w-full object-cover"
//         src={complaint.image_url}
//         alt=""
//       />
//     </div>

//     {/* Content */}
//     <div className="flex-1 min-w-0 relative pr-32">
//       {/* Status */}
//       <div className="absolute top-0 right-0">
//         <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#f8f4f6] w-[120px] min-w-[120px]">
//           <FaCircle
//             className="size-2"
//             color={getStatusColor(complaint.status)}
//           />

//           <p className="text-sm font-medium text-[#7B1034] capitalize whitespace-nowrap">
//             {complaint.status}
//           </p>
//         </div>
//       </div>

//       {/* Description */}
//       <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
//         {complaint.description}
//       </p>

//       {/* Date */}
//       <p className="mt-3 text-xs text-gray-400">
//         Registered on{" "}
//         <span className="font-medium">
//           {new Date(complaint.createdAt).toLocaleDateString("en-UK", {
//             month: "short",
//             day: "2-digit",
//             year: "numeric",
//           })}
//         </span>
//       </p>
//     </div>
//   </Link>
// );

const ComplaintCard = (complaint) => (
  <Link
    key={complaint._id}
    to={`/my-complaints/${complaint._id}`}
    className="flex flex-col sm:flex-row gap-4 p-4 bg-white border border-gray-200 rounded-2xl hover:border-[#7B1034]/20 hover:shadow-md transition-all duration-200"
  >
    {/* Image */}
    <div className="w-full sm:w-auto h-40 sm:h-24 sm:size-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
      <img
        className="h-full w-full object-cover"
        src={complaint.image_url}
        alt=""
      />
    </div>

    {/* Right Content */}
    <div className="flex-1 min-w-0 flex flex-col justify-between">
      {/* Top Row */}
      <div className="flex items-start justify-between gap-3">
        {/* Description + Date */}
        <div className="min-w-0 flex-1">
          <p className="text-base text-gray-700 leading-relaxed break-words">
            {complaint.description}
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Registered on{" "}
            <span className="font-medium">
              {new Date(complaint.createdAt).toLocaleDateString("en-UK", {
                month: "short",
                day: "2-digit",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-[#f8f4f6] shrink-0 self-start">
          <FaCircle
            className="size-2"
            color={getStatusColor(complaint.status)}
          />

          <p className="text-xs sm:text-sm font-medium text-[#7B1034] capitalize whitespace-nowrap">
            {complaint.status}
          </p>
        </div>
      </div>
    </div>
  </Link>
);

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getMyComplaints().then(setComplaints);
  }, []);

  return (
    <div className="py-4 px-3 sm:px-4 md:px-6 max-w-4xl mx-auto flex flex-col gap-4">
      {complaints.map(ComplaintCard)}
    </div>
  );
}
