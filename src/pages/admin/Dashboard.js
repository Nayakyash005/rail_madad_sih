import React, { useEffect, useState } from "react";
import Tile from "../../components/dashboard/Tile";
import { getComplaintCount } from "../../requests/complaint";

export default function Dashboard() {
  const [complaintData, setComplaintData] = useState({ count: 0, pending: 0 });

  useEffect(() => {
    getComplaintCount().then(setComplaintData);
  }, []);

  return (
    <section className="flex gap-4 flex-wrap justify-between w-full p-4">
      <div className="grid grid-cols-4 w-full gap-4">
        <Tile title={"Total Complaints"} value={complaintData.count} />
        <Tile title={"Pending Complaints"} value={complaintData.pending} />
        <Tile title="Users" value={700} />
        <Tile title="Products" value={50} />
      </div>
    </section>
  );
}
