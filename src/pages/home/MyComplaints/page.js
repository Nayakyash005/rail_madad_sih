import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa6";
import { getStatusColor } from "../../../lib/utils";
import { getMyComplaints } from "../../../requests/complaint";

const ComplaintCard = (complaint) => (
  <div
    key={complaint._id}
    className="flex sm:grid grid-cols-4 gap-2 md:gap-4 px-2 py-4 md:items-center bg-popover shadow hover:shadow-md transition"
  >
    <div className="size-24 min-w-24 md:size-32 md:min-w-32 justify-self-center">
      <img
        className="h-full w-full object-contain"
        src={complaint.image_url}
        alt=""
      />
    </div>

    <div className="md:py-2 px-2 col-span-2">
      <div className="flex sm:hidden items-center gap-2 mb-1">
        <FaCircle className="size-2" color={getStatusColor(complaint.status)} />
        <p>{complaint.status}</p>
      </div>
      <h2>
        Registered on{" "}
        <span className="font-semibold">
          {new Date(complaint.createdAt).toLocaleDateString("en-UK", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </h2>
      <div className="line-clamp-1 text-muted-foreground my-1 hover:underline">
        {complaint.description}
      </div>
    </div>

    <div className="hidden sm:flex items-center gap-2 px-4 w-32 min-w-32 justify-self-center">
      <FaCircle className="size-3" color={getStatusColor(complaint.status)} />
      <p>{complaint.status}</p>
    </div>
  </div>
);

export default function MyComplaintsPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    getMyComplaints().then(setComplaints);
  }, []);

  return (
    <div className="py-4 max-w-5xl mx-auto flex flex-col gap-4">
      {complaints.map(ComplaintCard)}
    </div>
  );
}

// const dummyData = [
//   {
//     _id: "66fbdb4e31046554b60aa0f7",
//     createdAt: "2024-01-09T18:30:00.000Z",
//     description: "test",
//     image_url:
//       "https://firebasestorage.googleapis.com/v0/b/lucid-splicer-426105-u4.appspot.com/o/complaints%2F1727781709217_railway-station-2.jpg?alt=media",
//     pnr: "123",
//     status: "pending",
//     updatedAt: "2024-02-09T18:30:00.000Z",
//   },
// ];
