import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
export async function getAllUsers() {
  const res = await fetch(process.env.REACT_APP_SERVER_URL + "/api/user/all", {
    credentials: "include",
  });

  if (res.ok) {
    const data = await res.json();

    if (data.success) {
      return data.data;
    }
  }

  return [];
}

export const getUserById = async (phone, setError) => {
  if (phone) {
    try {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/user/" + phone
      );
      console.log("user for this page is ", res.data);
      return res.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setError("User not found!");
      } else {
        setError("An unexpected error occurred!");
      }
      return null;
    }
  }
};
