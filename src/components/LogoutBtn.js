import React, { useContext } from "react";
import { SessionContext } from "../context/Session";

/** @param {import("react").HTMLAttributes<HTMLButtonElement>} param0 */
function LogoutBtn({ children, ...props }) {
  const { revalidateSession } = useContext(SessionContext);

  async function HandleSubmit() {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    await revalidateSession();
  }

  return (
    <button {...props} onClick={HandleSubmit}>
      {children}
    </button>
  );
}

export default LogoutBtn;
