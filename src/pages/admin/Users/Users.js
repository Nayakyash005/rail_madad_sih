import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  // TablePagination,
} from "../../../components/ui/Table";
import { TablePagination } from "@mui/material";
import { getAllUsers } from "../../../requests/users";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Button } from "../../../components/ui/Button";

export default function Users() {
  const [filteredData, setFilteredData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
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

  // const pageSize = Number.parseInt(pageSizeString);

  // if (isNaN(pageSize)) {
  //   pageSize = 10;
  // }

  const paginatedInvoices = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  function filter(e) {
    const key = e.target.value.trim().toLowerCase();

    setFilteredData(
      users.filter(
        (user) =>
          user.firstName.toLowerCase().includes(key) ||
          user.lastName.toLowerCase().includes(key) ||
          user.phone.toLowerCase().includes(key)
      )
    );
  }

  React.useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setFilteredData(data);
    });
  }, []);

  return (
    <main className="w-full h-full md:p-4">
      <div className="py-4 flex items-center">
        <Input
          className="max-w-sm bg-background mx-2 md:mx-0 shadow"
          placeholder="Search user..."
          onChange={filter}
        />
      </div>

      <Table className="border bg-background">
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="font-bold">First Name</TableHead>
            <TableHead className="font-bold">Last Name</TableHead>
            <TableHead className="font-bold">Phone No.</TableHead>
            <TableHead className="font-bold">Complaints</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedInvoices.length > 0 ? (
            paginatedInvoices.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>+91 {user.phone}</TableCell>
                <TableCell>{user.complaints}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        className="bg-primary w-full"
        style={{ color: "white" }}
        component="div"
        count={filteredData.length} // Total number of invoices
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 8, 10, 25]} // Options for rows per page
      />
    </main>
  );
}
