import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Avatar,
  Stack,
  Menu,
  Dialog,
  DialogTitle,
  DialogContent,
  InputAdornment,
  DialogActions,
  FormControlLabel,
  Checkbox,
  TablePagination,
} from "@mui/material";

import {
  StarBorder as StarBorderIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  OpenInNew as OpenInNewIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
} from "@mui/icons-material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { CSVLink } from "react-csv";
import { v4 as uuidv4 } from "uuid";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import FilterListIcon from "@mui/icons-material/FilterList";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import StarBorderIcon from "@mui/icons-material/StarBorder";
import PrintIcon from "@mui/icons-material/Print";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NoteIcon from "@mui/icons-material/Note";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import {
  MdModeEdit,
  MdOpenInNew,
  MdDelete,
  MdSearch,
  MdStarBorder,
  MdMoreVert,
  MdFilterList,
  MdContentCopy,
} from "react-icons/md";
import {
  Search,
  ExpandMore,
  RemoveShoppingCartRounded,
} from "@mui/icons-material";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { v4 as uuidv4 } from 'uuid';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from "@mui/icons-material/Edit";
// import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// import DeleteIcon from "@mui/icons-material/Delete";

const createRandomInvoiceData = (numInvoices) => {
  const randomData = [];
  const projectNames = [
    "PNR-522247401", //pnr
    "PNR-513745121",
    "PNR-909877541",
    "PNR-620190981",
    "PNR-123458950",
    "PNR-940813852",
  ];
  const clientNames = [
    "522247401", //phone
    "513745121",
    "909877541",
    "620190981",
    "123458950",
    "940813852",
  ];
  const statuses = ["Resolved", "In-Progress", "Pending", "Rejected"];

  for (let i = 0; i < numInvoices; i++) {
    const invoiceId = `#${Math.floor(1000000 + Math.random() * 9000000)}`;
    const client = clientNames[Math.floor(Math.random() * clientNames.length)];
    const project =
      projectNames[Math.floor(Math.random() * projectNames.length)];
    const dueDate = new Date(
      Date.now() - Math.random() * 100000000000
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const amount = Math.floor(100000 + Math.random() * 4900000);
    const paidAmount = Math.floor(Math.random() * amount);
    const balanceAmount = amount - paidAmount;
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    randomData.push({
      invoiceId,
      client,
      project,
      // amount,
      dueDate,
      paidAmount,
      balanceAmount,
      status,
      action: "", // This will be handled by the component rendering
    });
  }

  return randomData;
}; // Ensure this import is correct

const InvoiceListPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [filters, setFilters] = useState({ time: "", status: "", name: "" }); // an object to store the last filter of the user
  const [timeType, setTimeType] = useState("");
  const [allNames, setAllNames] = useState([]);
  const [Name, setName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [sortBy, setSortBy] = useState("");
  const [type, setType] = useState("");
  // const [showDashboard, setShowDashboard] = useState(false);
  const [printSettingsOpen, setPrintSettingsOpen] = useState(false);
  const [printOptions, setPrintOptions] = useState({
    includeHeaders: true,
    includeFooters: true,
  });
  const navigate = useNavigate();
  //to navigate to the new page
  // this is for the print button
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoices, setselectedInvoice] = useState([]);
  // for the filter one
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const open = Boolean(anchorEl3);
  // fnuction to sort the data
  // const [open, setOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when changing rows per page
  };
  const server = process.env.REACT_APP_SERVER_URL;
  const handleClick = (e, invoice) => {
    setAnchorEl3(e.currentTarget);
    setselectedInvoice(invoice);
  };

  const handleDelete = () => {
    const updatedInvoices = filteredInvoices.filter(
      (invoice) => invoice.invoiceId !== selectedInvoices.invoiceId
    );
    setFilteredInvoices(updatedInvoices);
    setInvoices(updatedInvoices); // Update the state with the filtered invoices
    handleClose();
  };

  const handleClone = () => {
    // Find the index of the selected invoice
    const selectedIndex = filteredInvoices.findIndex(
      (invoice) => invoice.id === selectedInvoices.id
    );

    // Clone the selected invoice
    const clonedInvoice = { ...selectedInvoices };

    // Insert the cloned invoice just below the selected invoice
    const updatedInvoices = [
      ...filteredInvoices.slice(0, selectedIndex + 1),
      clonedInvoice,
      ...filteredInvoices.slice(selectedIndex + 1),
    ];

    // Update the state with the new list
    setFilteredInvoices(updatedInvoices);
    handleClose();
  };

  const handleEdit = () => {
    navigate("/apps/invoice/create?id=12");
  };
  const handleClose = () => {
    setAnchorEl3(false);
  };
  const sortData = (data, sortType) => {
    console.log(data, "and", sortType);
    setSortBy(sortType);
    let sortedData;
    if (sortType === "date") {
      sortedData = data?.toSorted((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return dateA - dateB;
      });
    }

    if (sortType === "amount") {
      sortedData = data?.toSorted((a, b) => {
        return a.amount - b.amount;
      });
    }

    if (sortType === "client") {
      sortedData = data?.toSorted((p, q) => {
        return p.client.localeCompare(q.client);
      });
    }
    if (sortType === "") {
      sortedData = filteredInvoices;
    }
    console.log("data", sortedData);

    setFilteredInvoices(sortedData);
  };

  const onFilterChange = (name, value) => {
    //reset filtered invoice
    setFilteredInvoices(invoices);

    setFilters((fit) => {
      const filters = { ...fit, [name]: value };

      console.log(filters);
      if (filters.status !== "") {
        setFilteredInvoices((fi) =>
          fi.filter((e) => e.status === filters.status)
        );
      }
      if (filters.time !== "") {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1); // January 1st of the current year
        const endOfYear = new Date(currentYear, 11, 31);
        if (filters.time === "cyear") {
          // console.log(filterType);

          setFilteredInvoices((fi) => {
            return fi.filter((e) => {
              // console.log(new Date(e.dueDate));
              const d = new Date(e.dueDate);
              return d > startOfYear;
            });
          });
        }

        if (filters.time === "lyear") {
          console.log(filters);

          setFilteredInvoices((fi) => {
            return fi.filter((e) => {
              // console.log(new Date(e.dueDate));
              const s = new Date(currentYear - 1, 0, 1);
              const en = new Date(currentYear - 1, 11, 31);
              const d = new Date(e.dueDate);
              return d >= s && d <= en;
            });
          });
        }

        if (filters.time === "cmonth") {
          console.log(filters);
          const currMonth = new Date().getMonth();

          setFilteredInvoices((fi) => {
            return fi.filter((e) => {
              // console.log(new Date(e.dueDate));
              const s = new Date(currentYear, currMonth, 1);
              const en = new Date(currentYear, currMonth, 31);
              const d = new Date(e.dueDate);
              return d >= s && d <= en;
            });
          });
        }

        if (filters.time === "lmonth") {
          console.log(filters);
          const currMonth = new Date().getMonth();

          setFilteredInvoices((fi) => {
            return fi.filter((e) => {
              // console.log(new Date(e.dueDate));
              const s = new Date(currentYear, currMonth - 1, 1);
              const en = new Date(currentYear, currMonth - 1, 31);
              const d = new Date(e.dueDate);
              return d >= s && d <= en;
            });
          });
        }
      }

      if (filters.name != "") {
        setFilteredInvoices((f1) => {
          return f1.filter((e) => {
            return e.client === filters.name;
          });
        });
      }

      return filters;
    });
  };

  const fetchAllComplaints = async () => {
    const response = await axios.get(
      `${server}/api/complaints/getAllComplaints`
    );
    if (response) {
      console.log("responce", response);
      return response.data.data;
    }
    return [];
  };
  const paginatedInvoices = invoices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  useEffect(() => {
    const fetchInvoices = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/admin/invoices`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data && response.data.invoices) {
          const reversedInvoices = response.data.invoices.reverse();
          setInvoices(reversedInvoices);
        } else {
          console.error("Empty response data or unexpected format");
        }
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };

    // fetchInvoices();
    // Temporary: Use random data if API call fails
    // const data = createRandomInvoiceData(9);
    const fetchComplaint = async () => {
      const data = await fetchAllComplaints();
      console.log("data is ", data);
      const obj = {};
      data.forEach((item) => {
        obj[item.client] = item.client;
      });

      const clientName = Object.keys(obj); // jjust cretaed an array of client name only
      setAllNames(clientName);
      setInvoices(data);
      setFilteredInvoices(data);
    };
    fetchComplaint();
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handlePrintSettings = () => {
    setPrintSettingsOpen(true);
    handleMenuClose();
  };

  const handlePrintSettingsClose = () => {
    setPrintSettingsOpen(false);
  };

  const handlePrintOptionChange = (event) => {
    setPrintOptions((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
  };

  const handleSalesAnalysis = () => {
    console.log("Sales Analysis clicked");
    handleMenuClose();
  };

  const handleCreditNotes = () => {
    console.log("Credit Notes clicked");
    handleMenuClose();
  };

  const handleDisplayPreferences = () => {
    console.log("Manage Display Preferences clicked");
    handleMenuClose();
  };

  const columns = useMemo(
    () => [
      { Header: "Complaint ID", accessor: "invoiceId" },
      { Header: "Passenger-No", accessor: "client" },
      { Header: "PNR-No", accessor: "paidAmount" },
      { Header: "Description", accessor: "balanceAmount" },
      { Header: "Registered On", accessor: "dueDate" },
      { Header: "Severity", accessor: "amount" },
      { Header: "Status", accessor: "status" },
      { Header: "Action", accessor: "action" },
    ],
    []
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "resolved":
        return "success";
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      case "in-Progress":
        return "secondary";
      default:
        return "default";
    }
  };

  const getStatusTextColor = (status) => {
    switch (status) {
      case "Partially Paid":
        return "black";
      default:
        return "white";
    }
  };

  return (
    <div className="p-4">
      <Dialog open={printSettingsOpen} onClose={handlePrintSettingsClose}>
        <DialogTitle>Print Settings</DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={printOptions.includeHeaders}
                onChange={handlePrintOptionChange}
                name="includeHeaders"
              />
            }
            label="Include Headers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={printOptions.includeFooters}
                onChange={handlePrintOptionChange}
                name="includeFooters"
              />
            }
            label="Include Footers"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePrintSettingsClose}>Cancel</Button>
          <Button
            onClick={() => {
              console.log("Print with options:", printOptions);
              handlePrintSettingsClose();
            }}
          >
            Apply and Print
          </Button>
        </DialogActions>
      </Dialog>

      {0 ? (
        {
          /* <Dashboard /> */
        }
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <div style={{ display: "flex", gap: 18 }}>
              <TextField
                className="bg-white "
                placeholder="Search Invoices"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSearch />
                    </InputAdornment>
                  ),
                }}
                // size="large"
              />

              <Select
                value={type}
                name="status"
                onChange={(e) => {
                  onFilterChange("status", e.target.value);
                  setType(e.target.value);
                }} // filter change is a function to filter the data
                displayEmpty
                style={{
                  backgroundColor: "white",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                <MenuItem
                  value=""
                  style={{
                    width: "full",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  All Complaints
                </MenuItem>
                <MenuItem
                  value="Paid"
                  style={{
                    width: "full",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Paid Invoices
                </MenuItem>
                <MenuItem
                  value="Unpaid"
                  style={{
                    width: "full",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Unpaid Invoices
                </MenuItem>
                <MenuItem
                  value="Partially Paid"
                  style={{
                    width: "full",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Partially Paid Invoices
                </MenuItem>
                <MenuItem
                  value="Overdue"
                  style={{
                    width: "full",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  Overdue
                </MenuItem>
              </Select>

              <Select
                className="bg-white "
                value={sortBy}
                onChange={(e) => sortData(filteredInvoices, e.target.value)}
                displayEmpty
                size="small"
              >
                <MenuItem value="">Sort</MenuItem>
                <MenuItem value="client">Client</MenuItem>
                <MenuItem value="date">Date</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
              </Select>

              <Select
                className="bg-white "
                value={Name}
                name="name"
                onChange={(e) => {
                  onFilterChange("name", e.target.value);
                  setName(e.target.value);
                }}
                displayEmpty
              >
                <MenuItem disabled selected value="">
                  By Names
                </MenuItem>
                {allNames?.map((name, index) => (
                  <MenuItem
                    key={index} // Adding a unique key prop
                    value={name}
                    style={{ fontSize: "1rem", fontWeight: "bold" }}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>

              <Stack
                className="bg-white "
                label="Controlled picker"
                component="DateRangePicker"
              >
                {/* <DateRangePicker value={dateRange} onChange={(newValue) => setDateRange(newValue)} /> */}
              </Stack>
            </div>

            <Button
              startIcon={<MdFilterList />}
              variant="outlined"
              size="small"
              onClick={(e) => {
                setAnchorEl2(e.currentTarget);
              }}
            >
              Filter
            </Button>
            <Menu
              anchorEl={anchorEl2}
              open={Boolean(anchorEl2)}
              onClose={() => {
                setAnchorEl2(null);
              }}
            >
              <MenuItem
                onClick={() => {
                  onFilterChange("time", "cmonth");
                  setAnchorEl2(null); // Close the menu after selecting an option
                  setTimeType("cmonth");
                }}
              >
                This Month
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onFilterChange("time", "lmonth");
                  setAnchorEl2(null);
                  setTimeType("lmonth");
                }}
              >
                Last Month
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  onFilterChange("time", "cyear");
                  setAnchorEl2(null);
                  setTimeType("cyear");
                }}
              >
                Current Year
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  onFilterChange("time", "lyear");
                  setAnchorEl2(null);
                  setTimeType("lyear");
                }}
              >
                Last Year
              </MenuItem>
              <MenuItem
                onClick={(e) => {
                  onFilterChange("time", "");
                  setAnchorEl2(null);
                  setTimeType("All Time");
                }}
              >
                All Time
              </MenuItem>
            </Menu>
          </div>
          <Table className="bg-slate-50 shadow border">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.accessor}>{column.Header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedInvoices.map((invoice) => (
                <TableRow key={invoice._id}>
                  <TableCell>
                    <IconButton size="small">
                      <MdStarBorder />
                    </IconButton>
                    {invoice._id}
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Avatar
                        src={`/path-to-client-logo/${invoice.client}.png`}
                        alt={invoice.client}
                        style={{ marginRight: "0.5rem" }}
                      />
                      {invoice.phone}
                    </div>
                  </TableCell>
                  <TableCell>{invoice.pnr}</TableCell>
                  <TableCell style={{ maxWidth: "50px" }}>
                    {invoice.description || "any Description"}
                  </TableCell>
                  <TableCell>{invoice.dueDate || "03-04-2024"}</TableCell>
                  <TableCell>
                    {["high", "medium", "low"][Math.floor(Math.random() * 3)] ||
                      "high"}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={invoice.status}
                      color={getStatusColor(invoice.status)}
                      size="small"
                      style={{ color: getStatusTextColor(invoice.status) }}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={(event) => handleClick(event, invoice)}
                    >
                      <MdMoreVert />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl3}
                      open={open}
                      onClose={handleClose}
                    >
                      <MenuItem
                        onClick={() => {
                          handleEdit();
                        }}
                      >
                        <MdModeEdit
                          fontSize="small"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleEdit();
                        }}
                      >
                        <MdOpenInNew
                          fontSize="small"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Open
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleDelete();
                        }}
                      >
                        <MdDelete
                          fontSize="small"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Delete
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleClone();
                        }}
                      >
                        <MdContentCopy
                          fontSize="small"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Clone
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add TablePagination component */}
          <TablePagination
            component="div"
            count={invoices.length} // Total number of invoices
            page={page}
            style={{
              width: "full",
              backgroundColor: "rgb(158 36 82)",
              color: " white",
            }}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 8, 10, 25]} // Options for rows per page
          />
        </>
      )}
    </div>
  );
};

export default InvoiceListPage;
