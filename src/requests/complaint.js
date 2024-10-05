export async function getComplaintCount() {
  const res = await fetch(
    process.env.REACT_APP_SERVER_URL + "/api/complaints/count"
  );

  if (res.ok) {
    return await res.json();
  }

  return { count: 0, pending: 0 };
}

export async function getAllComplaints() {
  const res = await fetch(
    process.env.REACT_APP_SERVER_URL + "/api/complaints/all"
  );

  if (res.ok) {
    const data = await res.json();

    if(data.success) return data.data;
  }

  return [];
}

export async function getMyComplaints() {
  const res = await fetch(
    process.env.REACT_APP_SERVER_URL + "/api/complaints/my",
    { credentials: "include" }
  );

  if (res.ok) {
    const { data } = await res.json();

    return data || [];
  }

  return [];
}

export const createRandomInvoiceData = (numInvoices) => {
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
};
