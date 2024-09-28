export async function getComplaintCount() {
  const res = await fetch(
    process.env.REACT_APP_SERVER_URL + "/api/complaints/count"
  );

  if (res.ok) {
    return await res.json();
  }

  return { count: 0, pending: 0 };
}
