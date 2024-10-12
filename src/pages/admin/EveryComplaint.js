import React, { useEffect, useState } from "react";
// import express from "express";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  IconButton,
  Divider,
  Chip,
  Button,
  Paper,
  Collapse,
  Stack,
  styled,
} from "@mui/material";

import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  AccessTime as AccessTimeIcon,
  Train as TrainIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  PriorityHigh as PriorityHighIcon,
} from "@mui/icons-material";

// Styled Components
import { FaUserCircle } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropDownMenu";
import { Link } from "react-router-dom";
import { getComplaintById } from "../../requests/complaint";
import { AiFillDatabase } from "react-icons/ai";
import { getUserById } from "../../requests/users";
// import { data } from "@remix-run/router/dist/utils";
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

// Sample Data

const StatusChanged = ({ setComplaint, complaint }) => (
  <DropdownMenu style={{ width: "100%" }}>
    <DropdownMenuTrigger
      className="p-2 bg-white text-primary  rounded"
      style={{ width: "100%", border: "2px solid rgb(158 36 82)" }}
    >
      {/* <FaUserCircle size={24} /> */}
      <button
        variant="outlined"
        fullWidth
        //   onClick={() => setComplaint({...complaintSample,"status":"In-progress"})}
      >
        Change Status
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <div to="/admin">
        <DropdownMenuItem className="space-x-2">
          {/* <RiAdminFill /> */}

          <button
            variant="outlined"
            fullWidth
            //   onClick={() => setIsStatusChangeOpen(!isStatusChangeOpen)}
            onClick={() => setComplaint({ ...complaint, status: "pending" })}
          >
            Pending
          </button>
        </DropdownMenuItem>
      </div>
      <div to="/complaints">
        <DropdownMenuItem className="space-x-2">
          {/* <FaClipboardList /> */}
          <button
            variant="outlined"
            fullWidth
            //   onClick={() => setIsStatusChangeOpen(!isStatusChangeOpen)}
            onClick={() =>
              setComplaint({ ...complaint, status: "In-progress" })
            }
          >
            In-Progress
          </button>
        </DropdownMenuItem>
      </div>

      {/* <DropdownMenuSeparator /> */}

      <div className="w-full h-full">
        <DropdownMenuItem className="flex items-center space-x-2">
          {/* <MdLogout /> */}
          <button
            variant="outlined"
            fullWidth
            //   onClick={() => setIsStatusChangeOpen(!isStatusChangeOpen)}
            onClick={() => setComplaint({ ...complaint, status: "solved" })}
          >
            Solved
          </button>
        </DropdownMenuItem>
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
);

const ComplaintDetails = () => {
  const [showTimeline, setShowTimeline] = useState(true);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);
  const { id } = useParams();
  const [complaintId, setComplaintId] = useState(id);
  const [custData, setCustData] = useState();
  const [data, setData] = useState(); // should be an object
  const [complaint, setComplaint] = useState({
    passengerName: "John Doe",
    phoneNumber: "9876543210",
    pnr: "1234567890",
    description:
      "The seat was broken and uncomfortable. The train was also delayed by 3 hours without any notice.",
    trainNumber: "12456",
    status: "In Progress",
    dateFiled: "2024-09-29",
    resolved: false,
    priority: "high",
    location: "Coach B7, Seat 42",
    category: "Seat Issue",
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
  });
  const fillData = async (id) => {
    const responce = await getComplaintById(complaintId);
    // console.log("1 is ", responce);
    // console.log("2 is ", responce.status);
    console.log("3 is ", responce?.data?.data);
    setComplaintId(id);
    // const responce2 = await getpassengerDetailsById(id);
    setData(responce?.data?.data);
    let dummy;
    // console.log("phone is ", id);
    const responce2 = await getUserById(responce?.data?.data?.phone);
    console.log("1 is c", responce2);
    // console.log("2 is c", responce2.status);
    console.log("3 is c", responce2?.data);
    // setComplaintId(id);

    // const responce22 = await getpassengerDetailsById(id);
    setCustData(responce2?.data);

    setComplaint({
      passengerName: `${responce2?.data?.firstName} ${responce2?.data?.lastName}`,
      phoneNumber: responce2?.data?.phone,
      pnr: responce?.data?.data.pnr,
      description:
        responce?.data?.data.pnr ||
        "The seat was broken and uncomfortable. The train was also delayed by 3 hours without any notice.",
      trainNumber: "12456",
      status: responce?.data?.data.status || " In-Review",
      dateFiled: "2024-09-29",
      resolved: false,
      priority: "high",
      location: "Coach B7, Seat 42",
      category: "Seat Issue",
      image: responce?.data?.data.image_url,
      timeline: [
        {
          status: "Complaint Filed",
          date: "2024-09-29 10:30 AM",
          active: true,
        },
        {
          status: responce?.data?.data.status || "Under Review",
          date: "2024-09-29 11:00 AM",
          active: true,
        },
        {
          status: "Assigned to Department",
          date: "2024-09-29 02:00 PM",
          active: false,
        },
        { status: "Resolution", date: "Pending", active: false },
      ],
    });
  };
  const fillCustData = async (id) => {
    console.log("phone is ", id);
    const responce = await getUserById(id);
    console.log("1 is c", responce);
    // console.log("2 is c", responce.status);
    console.log("3 is c", responce?.data);
    // setComplaintId(id);

    // const responce2 = await getpassengerDetailsById(id);
    setCustData(responce?.data);
  };
  useEffect(() => {
    // const id = req.params;
    console.log("the is is ", id, complaintId);

    if (id) {
      fillData(id);
      // useState({});

      // console.log("data of complaint is ", data);
    }
  }, [id]);
  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: "auto" }}>
      <Card elevation={3} sx={{ overflow: "hidden" }}>
        <StyledPriorityBanner priority={complaint.priority} />

        <CardContent>
          {/* Header Section */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            mb={3}
          >
            <Box display="flex" gap={2}>
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  bgcolor: "primary.main",
                  fontSize: "1.5rem",
                }}
              >
                {complaint.passengerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>

              <Box>
                <Typography variant="h6" gutterBottom>
                  {complaint.passengerName}
                </Typography>
                <Stack spacing={1}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      {complaint.phoneNumber}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <TrainIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      PNR: {complaint.pnr}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Chip
                label={complaint.status}
                color={complaint.resolved ? "success" : "warning"}
                size="small"
                sx={{ fontWeight: 500 }}
              />
              <IconButton size="small">
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" color="error">
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Info Cards */}
          <Grid container spacing={2} mb={3}>
            {[
              {
                icon: <AccessTimeIcon />,
                label: "Filed",
                value: complaint.dateFiled,
              },
              {
                icon: <LocationIcon />,
                label: "Location",
                value: complaint.location,
              },
              {
                icon: <CategoryIcon />,
                label: "Category",
                value: complaint.category,
              },
              {
                icon: <PriorityHighIcon />,
                label: "Priority",
                value: complaint.priority.toUpperCase(),
              },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Paper elevation={0} sx={{ p: 1.5, bgcolor: "grey.50" }}>
                  <Box display="flex" alignItems="center" gap={1}>
                    {React.cloneElement(item.icon, {
                      color: "action",
                      fontSize: "small",
                    })}
                    <Typography variant="caption" color="text.secondary">
                      {item.label}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={500} mt={0.5}>
                    {item.value}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* Description */}
          <div className="flex-cols">
            <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.50", mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Complaint Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {complaint.description}
              </Typography>
            </Paper>
            <img
              src={
                complaint?.image ||
                "https://firebasestorage.googleapis.com/v0/b/lucid-splicer-426105-u4.appspot.com/o/complaints%2F1727781709217_railway-station-2.jpg?alt=media&token=8c245040-21b0-46e3-87fb-bae32a799a19"
              }
              alt="Image... "
            />
          </div>
          {/* Timeline */}
          <Box>
            <Button
              onClick={() => setShowTimeline(!showTimeline)}
              endIcon={showTimeline ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{ mb: 2 }}
            >
              Status Timeline
            </Button>
            <Collapse in={showTimeline}>
              <Box sx={{ pl: 2 }}>
                {complaint.timeline.map((item, index) => (
                  <StyledTimelineItem key={index} sx={{ mb: 2 }}>
                    <StyledTimelineDot active={item.active} />
                    <Typography variant="subtitle2">{item.status}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </StyledTimelineItem>
                ))}
              </Box>
            </Collapse>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" gap={2} mt={3}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => setShowTimeline(!showTimeline)}
            >
              Track Status
            </Button>
            {/* <Button
              variant="outlined"
              fullWidth
              onClick={() => setIsStatusChangeOpen(!isStatusChangeOpen)}
            >
              Change Status
            </Button> */}
            <div className="w-full">
              <StatusChanged
                setComplaint={setComplaint}
                complaint={complaint}
              />
            </div>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComplaintDetails;
