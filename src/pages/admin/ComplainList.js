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

// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
import { formatDateToDDMMYYYY } from "../../lib/utils";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import { v4 as uuidv4 } from 'uuid';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditIcon from "@mui/icons-material/Edit";

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

  const handleDelete = async () => {
    // const updatedInvoices = filteredInvoices.filter(
    //   (invoice) => invoice.invoiceId !== selectedInvoices.invoiceId,
    // );
    // setFilteredInvoices(updatedInvoices);
    // setInvoices(updatedInvoices); // Update the state with the filtered invoices
    // handleClose();
    console.log("id is", selectedInvoices._id);
    const updatedInvoices = await axios.delete(
      `${server}/api/complaints/${selectedInvoices._id}`,
    );
    console.log(updatedInvoices);
    setFilteredInvoices(updatedInvoices.data.remainingComplaints);
    setInvoices(updatedInvoices.data.remainingComplaints);
  };

  const handleClone = () => {
    // Find the index of the selected invoice
    const selectedIndex = filteredInvoices.findIndex(
      (invoice) => invoice.id === selectedInvoices.id,
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

  const handleOpen = (id) => {
    console.log("id is", selectedInvoices._id);
    navigate(`/admin/complaint-section/${selectedInvoices._id}`);
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
          fi.filter((e) => e.status === filters.status),
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
      `${server}/api/complaints/getAllComplaints`,
    );
    if (response) {
      console.log("responce", response);
      return response.data.data;
    }
    return [];
  };
  const paginatedInvoices = invoices.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );
  useEffect(() => {
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

  const handlePrintSettingsClose = () => {
    setPrintSettingsOpen(false);
  };

  const handlePrintOptionChange = (event) => {
    setPrintOptions((prev) => ({
      ...prev,
      [event.target.name]: event.target.checked,
    }));
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
    [],
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
    <div className="max-w-7xl mx-auto px-3 sm:px-5 py-4 sm:py-6">
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
          <div className="mb-5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2937]">
              Complaints
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage and track all registered complaints
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <Table className="bg-white">
              <TableHead className="bg-[#faf7f8]">
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.accessor}
                      sx={{
                        fontWeight: 700,
                        color: "#374151",
                        fontSize: "0.9rem",
                      }}
                    >
                      {column.Header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedInvoices.map((invoice) => (
                  <TableRow
                    key={invoice._id}
                    hover
                    sx={{
                      "&:hover": {
                        backgroundColor: "#fcfafb",
                      },
                    }}
                  >
                    <TableCell>
                      {/* <IconButton size="small">
                        <MdStarBorder />
                      </IconButton> */}
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
                    <TableCell
                      sx={{
                        maxWidth: 260,
                        color: "#4b5563",
                      }}
                    >
                      <div className="line-clamp-2">
                        {invoice.description || "No description"}
                      </div>
                    </TableCell>
                    <TableCell>
                      {formatDateToDDMMYYYY(invoice.updatedAt)}
                    </TableCell>
                    <TableCell>{invoice.severity || "mid"}</TableCell>
                    <TableCell>
                      <Chip
                        label={invoice.status}
                        size="small"
                        sx={{
                          fontWeight: 600,
                          borderRadius: "999px",
                          bgcolor:
                            invoice.status === "resolved"
                              ? "#ecfdf3"
                              : invoice.status === "pending"
                                ? "#fff7ed"
                                : invoice.status === "rejected"
                                  ? "#fef2f2"
                                  : "#f3f0ff",

                          color:
                            invoice.status === "resolved"
                              ? "#166534"
                              : invoice.status === "pending"
                                ? "#c2410c"
                                : invoice.status === "rejected"
                                  ? "#dc2626"
                                  : "#7B1034",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        sx={{
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "#f3f0ff",
                          },
                        }}
                        size="small"
                        onClick={(event) => handleClick(event, invoice)}
                      >
                        <MdMoreVert />
                      </IconButton>
                      <Menu
                        PaperProps={{
                          sx: {
                            borderRadius: 3,
                            border: "1px solid #f1e6eb",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
                            mt: 1,
                          },
                        }}
                        anchorEl={anchorEl3}
                        open={open}
                        onClose={handleClose}
                      >
                        {/* <MenuItem
                        onClick={() => {
                          handleEdit();
                        }}
                      >
                        <MdModeEdit
                          fontSize="small"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Edit
                      </MenuItem> */}
                        <MenuItem
                          sx={{
                            gap: 1.5,
                            py: 1.2,
                            fontSize: "0.95rem",
                          }}
                          onClick={() => {
                            handleOpen(invoice._id);
                          }}
                        >
                          <MdOpenInNew
                            fontSize="small"
                            style={{ marginRight: "0.5rem" }}
                          />
                          Open
                        </MenuItem>
                        <MenuItem
                          sx={{
                            gap: 1.5,
                            py: 1.2,
                            fontSize: "0.95rem",
                          }}
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
                        {/* <MenuItem
                        onClick={() => {
                          handleClone();
                        }}
                      >
                        <MdContentCopy
                          fontSize="small"
                          style={{ marginRight: "0.5rem" }}
                        />
                        Clone
                      </MenuItem> */}
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
              sx={{
                borderTop: "1px solid #f1f5f9",
                bgcolor: "white",
              }}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 8, 10, 25]} // Options for rows per page
            />
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceListPage;
