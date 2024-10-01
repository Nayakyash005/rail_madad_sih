import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/Table";
import { getAllUsers } from "../../../requests/users";
import { Input } from "../../../components/ui/input";

export default function Users() {
  const [filteredData, setFilteredData] = React.useState([]);
  const [users, setUsers] = React.useState([]);

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
    <main className="bg-background w-full h-full p-4">
      <div className="py-4 flex items-center">
        <Input
          placeholder="Search user..."
          onChange={filter}
          className="max-w-sm bg-background"
        />
      </div>

      <Table className="border bg-background">
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead className="text-white">First Name</TableHead>
            <TableHead className="text-white">Last Name</TableHead>
            <TableHead className="text-white">Phone No.</TableHead>
            <TableHead className="text-white">Complaints</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((user) => (
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
    </main>
  );
}
