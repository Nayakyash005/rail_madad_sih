import React from "react";
import Tile from "../../components/dashboard/Tile";

export default function Dashboard() {
  return (
    <section className="gap-4 flex flex-wrap justify-between w-full">
      <Tile
        title="Complaints"
        value={6900}
        percentage={40}
        color="rgb(80 225 80)"
      />
      <Tile title="Users" value={700} percentage={-14} color="rgb(80 80 255)" />
      <Tile
        title="Transactions"
        value={500}
        percentage={80}
        color="rgb(225 0 225)"
      />
      <Tile title="Products" value={50} percentage={30} color="rgb(225 80 0)" />
    </section>
  );
}
