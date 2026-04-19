import React, { useEffect, useState } from "react";
import { Box, styled } from "@mui/material";
import {
  AccessTime as AccessTimeIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";
import { useLoaderData } from "react-router-dom";
import { getComplaint } from "../../requests/complaint";

const StyledPriorityBanner = styled(Box)(({ theme, priority }) => ({
  width: "100%",
  height: "4px",
  background:
    priority === "high"
      ? theme.palette.error.main
      : priority === "medium"
      ? theme.palette.warning.main
      : theme.palette.success.main,
}));

const StyledTimelineItem = styled(Box)(({ theme }) => ({
  position: "relative",
  paddingLeft: theme.spacing(3),
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 2,
    background: theme.palette.grey[300],
  },
}));

const StyledTimelineDot = styled(Box)(({ theme, active }) => ({
  position: "absolute",
  left: -4,
  top: 12,
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: active ? theme.palette.primary.main : theme.palette.grey[400],
  border: `2px solid ${theme.palette.background.paper}`,
  zIndex: 1,
}));

const Tile = ({ Icon, label, value }) => (
  <div className="bg-muted p-4 rounded-sm space-y-1">
    <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
      <Icon fontSize="small" />
      <b>{label}</b>
    </div>
    <p className="text-sm">{value}</p>
  </div>
);

const ComplaintDetails = () => {
  const [complaint, setComplaint] = useState(dummyData);
  const complaintId = useLoaderData();

  useEffect(() => {
    getComplaint(complaintId).then((data) =>
      setComplaint({ ...dummyData, ...data })
    );
  }, []);

  return (
    <div className="max-w-4xl bg-background mx-auto my-4 p-4 space-y-2">
      <img
        className="w-full max-w-md max-h-96"
        src="https://firebasestorage.googleapis.com/v0/b/lucid-splicer-426105-u4.appspot.com/o/complaints%2F1727781709217_railway-station-2.jpg?alt=media&token=8c245040-21b0-46e3-87fb-bae32a799a19"
        alt="Image... "
      />

      <div className="bg-muted py-3 px-4 rounded-sm">
        <h3 className="text-muted-foreground">
          <b>Complaint Description</b>
        </h3>
        <p className="text-sm mt-0.5">{complaint.description}</p>
      </div>

      <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        <Tile
          Icon={AccessTimeIcon}
          label="Filed"
          value={new Date(complaint.createdAt).toLocaleDateString("en-UK", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        />
        <Tile Icon={CategoryIcon} label="Category" value={complaint.category} />
        <Tile Icon={LocationIcon} label="Sub Category" value={complaint.subcategory} />
        <Tile
          Icon={PriorityHighIcon}
          label="Priority"
          value={complaint.severity.toUpperCase()}
        />
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-2">
        {complaint.timeline.map((item, index) => (
          <StyledTimelineItem key={index}>
            <StyledTimelineDot active={item.active} />
            <p className="text-muted-foreground">{item.status}</p>
            <p className="text-xs">{item.date}</p>
          </StyledTimelineItem>
        ))}
      </div>
    </div>
  );
};

export default ComplaintDetails;

const dummyData = {
  description:
    "The seat was broken and uncomfortable. The train was also delayed by 3 hours without any notice.",
  status: "In Progress",
  createdAt: "2024-09-29",
  resolved: false,
  severity: "high",
  location: "Coach B7, Seat 42",
  category: "Seat Issue",
  subcategory: "Seat Issue",
  timeline: [
    { status: "Complaint Filed", date: "2024-09-29 10:30 AM", active: true },
    { status: "Under Review", date: "2024-09-29 11:00 AM", active: true },
    {
      status: "Assigned to Department",
      date: "2024-09-29 02:00 PM",
      active: false,
    },
    { status: "Resolution", date: "Pending", active: false },
  ],
};
