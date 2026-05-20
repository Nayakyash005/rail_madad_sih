import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

import { Snackbar, Alert } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

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
import axios from "axios";
const StyledPriorityBanner = styled(Box)(({ theme, priority }) => ({
  width: "100%",
  height: "6px",
  borderRadius: "999px",
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
    <DropdownMenuTrigger className="w-full rounded-lg border border-[#d8d3e8] bg-[#f3f0ff] text-gray-800 hover:bg-[#7a183c] hover:text-white transition-all duration-200 py-3 font-medium text-[0.95rem]">
      {/* <FaUserCircle size={24} /> */}
      <span>Change Status</span>
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
              setComplaint({ ...complaint, status: "in-progress" })
            }
          >
            In-progress
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
            onClick={() => setComplaint({ ...complaint, status: "resolved" })}
          >
            Resolved
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
  const [open, setOpen] = useState(false);
  const [error, setError] = useState();
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
      { status: "Complaint Filed" },
      { status: "Pending" },
      { status: "In Progress" },
      { status: "Resolved" },
    ],
  });
  const navigate = useNavigate();
  const handleSave = async () => {
    const status = complaint?.status || "pending";
    const responce = await axios.post(
      process.env.REACT_APP_SERVER_URL + "/api/complaints/changeStatus",
      {
        id: complaintId,
        status: status,
      },
      {
        headers: {
          "content-type": "application/json",
        },
      },
    );
    console.log("ressponce is ", responce);
    navigate("/admin/complaints");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const fillData = async (id) => {
    const responce = await getComplaintById(complaintId);
    // console.log("1 is ", responce);
    // console.log("2 is ", responce.status);
    console.log("3 is ", responce?.data?.data);
    setComplaintId(id);
    // const responce2 = await getpassengerDetailsById(id);
    setData(responce?.data?.data);
    // console.log("phone is ", id);
    const responce2 = await getUserById(responce?.data?.data?.phone, setError);

    if (error) {
      setOpen(true); // Show the Snackbar when there's an error
    }
    console.log("1 is c", responce2, error);
    // console.log("2 is c", responce 2.status);
    if (!responce2) {
      console.log("user not found");
      setOpen(true);
    }
    console.log("3 is c", responce2?.data);
    // setComplaintId(id);

    // const responce22 = await getpassengerDetailsById(id);
    setCustData(responce2?.data);

    setComplaint({
      passengerName: `${responce2?.data?.firstName} ${responce2?.data?.lastName}`,
      phoneNumber: responce2?.data?.phone,
      pnr: responce?.data?.data.pnr,
      description:
        responce?.data?.data?.description ||
        "The seat was broken and uncomfortable. The train was also delayed by 3 hours without any notice.",
      trainNumber: "12456",
      status: responce?.data?.data?.status || " In-Review",
      dateFiled: responce?.data?.data?.updatedAt || "2024-09-29",
      resolved: false,
      priority: responce?.data?.data?.severity || "high",
      location: "Coach B7, Seat 42",
      category: responce?.data?.data?.category || "Seat Issue",
      image: responce?.data?.data?.image_url,
      timeline: [
        { status: "Complaint Filed" },
        { status: "Pending" },
        { status: "In Progress" },
        { status: "Resolved" },
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
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: 3,
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <Card
        elevation={0}
        sx={{
          overflow: "hidden",
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
        }}
      >
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>

        {/* <StyledPriorityBanner priority={complaint.priority} /> */}

        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          {/* Header Section */}
          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            gap={3}
            mb={4}
          >
            {/* Left User Section */}
            <Box
              display="flex"
              alignItems="center"
              gap={2}
              width="100%"
              minWidth={0}
            >
              {/* Avatar */}
              <Avatar
                sx={{
                  width: 60,
                  height: 60,
                  bgcolor: "#7B1034",
                  fontSize: "1.4rem",
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                {complaint.passengerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>

              {/* User Info */}
              <Box minWidth={0}>
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.15rem",
                      sm: "1.4rem",
                    },
                    fontWeight: 700,
                    color: "#1f2937",
                    lineHeight: 1.2,
                    mb: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {complaint.passengerName}
                </Typography>

                <Stack spacing={0.7}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <PhoneIcon
                      sx={{
                        fontSize: 18,
                        color: "#6b7280",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#6b7280",
                      }}
                    >
                      {complaint.phoneNumber}
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <TrainIcon
                      sx={{
                        fontSize: 18,
                        color: "#6b7280",
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: "0.95rem",
                        color: "#6b7280",
                      }}
                    >
                      PNR: {complaint.pnr}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* Status */}
            <Chip
              label={complaint.status}
              size="small"
              sx={{
                fontWeight: 700,
                fontSize: "0.85rem",
                bgcolor: "#f8f1f4",
                color: "#7B1034",
                borderRadius: "999px",
                px: 1,
                height: 32,
                alignSelf: {
                  xs: "flex-start",
                  sm: "center",
                },
                textTransform: "capitalize",
              }}
            />
          </Box>

          {/* Info Cards */}
          <Grid container spacing={2.5} mb={4}>
            {[
              {
                icon: <AccessTimeIcon />,
                label: "Filed",
                value: new Date(complaint.dateFiled).toLocaleDateString(
                  "en-UK",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  },
                ),
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
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    bgcolor: "#faf7f8",
                    border: "1px solid #f1e6eb",
                    borderRadius: 3,
                    height: "100%",
                    minHeight: 80,
                    display: "flex",
                    flexDirection: "column",
                    // justifyContent: "space-between",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    {React.cloneElement(item.icon, {
                      color: "action",
                      fontSize: "small",
                    })}
                    <Typography
                      sx={{
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#6b7280",
                      }}
                    >
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
          <div className="flex flex-col lg:grid lg:grid-cols-[1.4fr_0.8fr] gap-4 items-stretch">
            <Paper
              elevation={0}
              sx={{
                p: 3,
                bgcolor: "#faf7f8",
                border: "1px solid #f1e6eb",
                borderRadius: 4,
                flex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                // justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#1f2937",
                  mb: 1.5,
                }}
              >
                Complaint Description
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {complaint.description}
              </Typography>
            </Paper>
            <img
              className="w-full h-64 lg:h-full max-h-[320px] object-cover rounded-2xl border border-gray-200"
              src={
                complaint?.image ||
                "https://firebasestorage.googleapis.com/v0/b/lucid-splicer-426105-u4.appspot.com/o/complaints%2F1727781709217_railway-station-2.jpg?alt=media&token=8c245040-21b0-46e3-87fb-bae32a799a19"
              }
              alt="Complaint"
            />
          </div>
          {/* Timeline */}
          <Box>
            <Button
              onClick={() => setShowTimeline(!showTimeline)}
              endIcon={showTimeline ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              sx={{
                mb: 2,
                color: "#7B1034",
                fontWeight: 700,
                fontSize: "1rem",
                textTransform: "none",
              }}
            >
              Status Timeline
            </Button>

            <Collapse in={showTimeline}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 4,
                  bgcolor: "#faf7f8",
                  border: "1px solid #f1e6eb",
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent="space-between"
                >
                  {complaint.timeline.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        flex: 1,
                        position: "relative",
                        textAlign: "center",
                      }}
                    >
                      {/* Line */}
                      {index !== complaint.timeline.length - 1 && (
                        <Box
                          sx={{
                            display: { xs: "none", sm: "block" },
                            position: "absolute",
                            top: 12,
                            left: "55%",
                            width: "90%",
                            height: 2,
                            bgcolor:
                              (complaint.status === "pending" && index <= 1) ||
                              (complaint.status === "in-progress" &&
                                index <= 2) ||
                              (complaint.status === "resolved" && index <= 3)
                                ? "#7B1034"
                                : "#e5e7eb",
                            zIndex: 0,
                          }}
                        />
                      )}

                      {/* Dot */}
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          mx: "auto",
                          mb: 1,
                          bgcolor:
                            (complaint.status === "pending" && index <= 1) ||
                            (complaint.status === "in-progress" &&
                              index <= 2) ||
                            (complaint.status === "resolved" && index <= 3)
                              ? "#7B1034"
                              : "#d1d5db",
                          border: "4px solid white",
                          boxShadow: "0 0 0 2px #f3e8ee",
                          position: "relative",
                          zIndex: 1,
                        }}
                      />

                      {/* Status */}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color:
                            (complaint.status === "pending" && index <= 1) ||
                            (complaint.status === "in-progress" &&
                              index <= 2) ||
                            (complaint.status === "resolved" && index <= 3)
                              ? "#7B1034"
                              : "#6b7280",
                        }}
                      >
                        {item.status}
                      </Typography>

                      {/* Date */}
                      {/* <Typography
                        variant="caption"
                        sx={{
                          color: "#9ca3af",
                          mt: 0.5,
                          display: "block",
                        }}
                      >
                        {item.date}
                      </Typography> */}
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Collapse>
          </Box>

          {/* Action Buttons */}
          <Box display="flex" gap={2} mt={3}>
            <Button
              fullWidth
              onClick={() => setShowTimeline(!showTimeline)}
              sx={{
                borderRadius: "10px",
                border: "1px solid #d8d3e8",
                backgroundColor: "#f3f0ff",
                color: "#1f2937",
                textTransform: "none",
                fontWeight: 500,
                fontSize: "0.95rem",
                boxShadow: "none",
                py: 1.2,

                "&:hover": {
                  backgroundColor: "#7a183c",
                  color: "white",
                  boxShadow: "none",
                },
              }}
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
          <div className="flex justify-end pt-4">
            <button
              className="bg-[#7B1034] text-white rounded-xl px-5 py-2.5 flex items-center gap-2 hover:bg-[#63102f] transition"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ComplaintDetails;
