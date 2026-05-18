import React, { Suspense } from "react";
import { Skeleton } from "@mui/material";
import {
  MdOutlineCategory as CategoryIcon2,
  MdCategory as CategoryIcon,
  MdPriorityHigh as PriorityHighIcon,
} from "react-icons/md";
import { Await, useLoaderData } from "react-router-dom";
import { BsCalendar2DateFill as CalendarIcon } from "react-icons/bs";
import { FaCircle } from "react-icons/fa6";
import { cn } from "../../../../lib/utils";

const Tile = ({ Icon, label, value }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-3 space-y-2 shadow-sm">
    <div className="flex items-center gap-2 text-gray-500 text-sm">
      <Icon className="size-4" />
      <b>{label}</b>
    </div>
    <p className="text-sm font-medium text-gray-800 break-words">
      {value || "N/A"}
    </p>
  </div>
);

function ComplaintCard(complaint) {
  const progress = getProgress(complaint.status);
  return (
    <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-4 sm:p-5 space-y-4">
      <img
        className="w-full rounded-2xl h-52 sm:h-64 object-cover bg-gray-100"
        src={
          complaint?.image_url ||
          "https://images.pexels.com/photos/2526935/pexels-photo-2526935.jpeg?_gl=1*1yqznh4*_ga*NTEwMjg0NzgzLjE3NzIzODYxNDg.*_ga_8JE65Q40S6*czE3NzIzODYxNDgkbzEkZzEkdDE3NzIzODYxNjAkajQ4JGwwJGgw"
        }
        alt="Image... "
      />

      {/* Description */}
      <div className="bg-[#faf7f8] border border-[#f1e6eb] p-3 sm:p-4 rounded-2xl">
        <h3 className="text-sm font-semibold text-[#7B1034]">
          <b>Complaint Description</b>
        </h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mt-2">
          {complaint.description}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4">
        <Tile
          Icon={CalendarIcon}
          label="Filed"
          value={new Date(
            complaint.createdAt || "2 oct 1869",
          ).toLocaleDateString("en-UK", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        />
        <Tile Icon={CategoryIcon} label="Category" value={complaint.category} />
        <Tile
          Icon={CategoryIcon2}
          label="Sub Category"
          value={complaint.subcategory}
        />
        <Tile
          Icon={PriorityHighIcon}
          label="Priority"
          value={complaint.severity?.toUpperCase()}
        />
      </div>

      {/* Timeline */}
      {/* <div className="w-fit pt-4 relative">
        <div
          className="absolute mx-5 my-2 w-0.5 overflow-visible"
          style={{
            height: 128,
            left: -17,
            background: `linear-gradient(rgb(34,197,94) ${
              progress * 100
            }%, hsl(210, 40%, 90.1%) 0%)`,
          }}
        ></div>

        <ul className="h-36 flex text-sm flex-col max-w-fit justify-between">
          <li className="flex items-center gap-4">
            <FaCircle
              className={cn(
                "relative size-2",
                progress >= 0 ? "text-green-500" : "text-gray-400",
              )}
            />
            <span>Pending</span>
          </li>
          <li className="flex items-center gap-4">
            <FaCircle
              className={cn(
                "relative size-2",
                progress >= 0.33 ? "text-green-500" : "text-gray-400",
              )}
            />
            <span>Registered</span>
          </li>
          <li className="flex items-center gap-4">
            <FaCircle
              className={cn(
                "relative size-2",
                progress >= 0.66 ? "text-green-500" : "text-gray-400",
              )}
            />
            <span>In Progress</span>
          </li>
          <li className="flex items-center gap-4">
            <FaCircle
              className={cn(
                "relative size-2",
                progress >= 0.99 ? "text-green-500" : "text-gray-400",
              )}
            />
            <span>Resolved</span>
          </li>
        </ul>
      </div> */}
      <div className="bg-[#faf7f8] border border-[#f1e6eb] rounded-xl p-3">
        <h3 className="text-sm font-semibold text-[#7B1034] mb-4">
          <b>Complaint Status</b>
        </h3>

        <div className="flex flex-wrap gap-2">
          {["Pending", "Registered", "In Progress", "Resolved"].map(
            (step, index) => {
              const active =
                (index === 0 && progress >= 0) ||
                (index === 1 && progress >= 0.33) ||
                (index === 2 && progress >= 0.66) ||
                (index === 3 && progress >= 0.99);

              return (
                <div
                  key={step}
                  className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-medium ${
                    active
                      ? "text-[#7B1034] bg-[#f8f1f4]"
                      : "text-gray-400 bg-gray-100"
                  }`}
                >
                  {step}
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

const ComplaintDetails = () => {
  const { complaintPromise } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 space-y-4">
      <Suspense fallback={PageSkeleton}>
        <Await resolve={complaintPromise} children={ComplaintCard} />
      </Suspense>
    </div>
  );
};

const getProgress = (status) => {
  console.log(status);
  switch (status) {
    case "pending":
      return 0;
    case "registered":
      return 0.33;
    case "in-progress":
      return 0.66;
    case "resolved":
      return 0.99;
    case "rejected":
      return 0.99;
    default:
      return 0;
  }
};

const PageSkeleton = (
  <>
    <Skeleton
      sx={{ bgcolor: "hsl(210, 40%, 96.1%)" }}
      animation={false}
      variant="rectangular"
      height={320}
    />

    <Skeleton
      sx={{ bgcolor: "hsl(210, 40%, 96.1%)" }}
      animation={false}
      variant="rectangular"
      height={70}
    />

    {/* Info Cards */}
    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
      <Skeleton
        sx={{ bgcolor: "hsl(210, 40%, 96.1%)" }}
        animation={false}
        variant="rectangular"
        height={76}
      />
      <Skeleton
        sx={{ bgcolor: "hsl(210, 40%, 96.1%)" }}
        animation={false}
        variant="rectangular"
        height={76}
      />
      <Skeleton
        sx={{ bgcolor: "hsl(210, 40%, 96.1%)" }}
        animation={false}
        variant="rectangular"
        height={76}
      />
      <Skeleton
        sx={{ bgcolor: "hsl(210, 40%, 96.1%)" }}
        animation={false}
        variant="rectangular"
        height={76}
      />
    </div>
    <div className="flex w-fit pt-4">
      <div
        className="mx-5 my-2 relative w-0.5 overflow-visible"
        style={{
          background: `linear-gradient(gray 0%, hsl(210, 40%, 90.1%) 0%)`,
        }}
      >
        <FaCircle
          style={{ top: -2, color: "gray" }}
          className="absolute left-[-2.5px] size-2"
        />
      </div>

      <ul className="h-32 flex text-sm flex-col max-w-fit justify-between">
        <li>Pending</li>
        <li>Registered</li>
        <li>In Progress</li>
        <li>Resolved</li>
      </ul>
    </div>
  </>
);

export default ComplaintDetails;
