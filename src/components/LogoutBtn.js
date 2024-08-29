import React, { useContext } from "react";
import { SessionContext } from "../context/Session";

function LogoutBtn({ children }) {
  const { revalidateSession } = useContext(SessionContext);

  async function HandleSubmit() {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    await revalidateSession();
  }
  return <button onClick={HandleSubmit}>{children}</button>;
}

export default LogoutBtn;
