import { wait } from "../lib/utils";

import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:8800";

export async function getComplaintCount() {
  const res = await fetch(SERVER_URL + "/api/complaints/count");

  if (res.ok) {
    return await res.json();
  }

  return { count: 0, pending: 0 };
}

export async function getAllComplaints() {
  const res = await fetch(SERVER_URL + "/api/complaints/all");

  if (res.ok) {
    const data = await res.json();

    if (data.success) return data.data;
  }

  return [];
}

export async function getMyComplaints() {
  const res = await fetch(SERVER_URL + "/api/complaints/my", {
    credentials: "include",
  });

  if (res.ok) {
    const { data } = await res.json();

    return data || [];
  }

  return [];
}

export async function getComplaint(complaintId) {
  console.log("complain id is ", complaintId);
  const res = await fetch(
    process.env.REACT_APP_SERVER_URL + "/api/complaints/" + complaintId,
    { credentials: "include" },
  );
  if (res.ok) {
    const { data } = await res.json();

    return data || {};
  }

  return {};
}

export const getComplaintById = async (id) => {
  const responce = axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/complaints/${id}`,
  );

  console.log("the responce is ", responce);
  return responce;
};

export const getpassengerDetailsById = async (id) => {
  const responce = axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/passanger/${id}`,
  );

  console.log("the responce is ", responce);
  return responce;
};
