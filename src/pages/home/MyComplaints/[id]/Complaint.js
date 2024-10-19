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
  <div className="bg-muted p-4 rounded-sm space-y-1">
    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
      <Icon className="size-4" />
      <b>{label}</b>
    </div>
    <p className="text-sm">{value}</p>
  </div>
);

function ComplaintCard(complaint) {
  const progress = getProgress(complaint.status);
  return (
    <>
      <img
        className="w-full max-w-md max-h-96 object-contain"
        src={complaint.image_url}
        alt="Image... "
      />

      {/* Description */}
      <div className="bg-muted py-3 px-4 rounded-sm">
        <h3 className="text-muted-foreground">
          <b>Complaint Description</b>
        </h3>
        <p className="text-sm mt-0.5">{complaint.description}</p>
      </div>

      {/* Info Cards */}
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Tile
          Icon={CalendarIcon}
          label="Filed"
          value={new Date(
            complaint.createdAt || "2 oct 1869"
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
      <div className="w-fit pt-4 relative">
        <div
          className="absolute mx-5 my-2 w-0.5 overflow-visible"
          style={{
            height: 128,
            left: -17,
            background: `linear-gradient(rgb(34,197,94) ${
              progress * 100
            }%, hsl(210, 40%, 90.1%) 0%)`,
          }}
        >
        </div>

        <ul className="h-36 flex text-sm flex-col max-w-fit justify-between">
          <li className="flex items-center gap-4">
            <FaCircle className={cn("relative size-2", progress >= 0 ? "text-green-500" : "text-gray-400")} />
            <span>Pending</span>
          </li>
          <li className="flex items-center gap-4">
            <FaCircle className={cn("relative size-2", progress >= 0.33 ? "text-green-500" : "text-gray-400")} />
            <span>Registered</span>
          </li>
          <li className="flex items-center gap-4">
            <FaCircle className={cn("relative size-2", progress >= 0.66 ? "text-green-500" : "text-gray-400")} />
            <span>In Progress</span>
          </li>
          <li className="flex items-center gap-4">
            <FaCircle className={cn("relative size-2", progress >= 0.99 ? "text-green-500" : "text-gray-400")} />
            <span>Resolved</span>
          </li>
        </ul>
      </div>
    </>
  );
}

const ComplaintDetails = () => {
  const { complaintPromise } = useLoaderData();

  return (
    <div className="max-w-4xl bg-background mx-auto md:my-4 p-4 space-y-2">
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
      height={208}
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
