import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/Table";
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
  const [pageSizeString, setPageSize] = useState("10");
  const [page, setPage] = useState(0);

  const pageSize = Number.parseInt(pageSizeString);

  if (isNaN(pageSize)) {
    pageSize = 10;
  }

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

      <div className="border bg-background shadow">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary">
              <TableHead className="text-white">First Name</TableHead>
              <TableHead className="text-white">Last Name</TableHead>
              <TableHead className="text-white">Phone No.</TableHead>
              <TableHead className="text-white">Complaints</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData
                .slice(page * pageSize, (page + 1) * pageSize)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.firstName}</TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell className="font-roboto-mono text-nowrap">
                      +91 {user.phone}
                    </TableCell>
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

          <TableFooter>
            <TableCell colSpan={4}>
              <div className="w-full text-sm flex gap-4 items-center justify-end">
                <div className="flex items-center gap-2">
                  <span>Rows per page: </span>
                  <label htmlFor="rows-per-page" className="text-black">
                    <Select
                      onValueChange={setPageSize}
                      name="categoryId"
                      value={pageSizeString.toString()}
                    >
                      <SelectTrigger className="h-7">
                        <SelectValue placeholder="Rows per page" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <span>
                    {page * pageSize + 1}-
                    {Math.min(filteredData.length, (page + 1) * pageSize + 1)}{" "}
                    of {filteredData.length}
                  </span>
                  <Button
                    size="sm"
                    variant="custom"
                    disabled={page <= 0}
                    onClick={() => setPage((n) => n - 1)}
                  >
                    {"<-"}
                  </Button>
                  <Button
                    size="sm"
                    variant="custom"
                    disabled={(page + 1) * pageSize >= filteredData.length}
                    onClick={() => setPage((n) => n + 1)}
                  >
                    {"->"}
                  </Button>
                </div>
              </div>
            </TableCell>
          </TableFooter>
        </Table>
      </div>
    </main>
  );
}
