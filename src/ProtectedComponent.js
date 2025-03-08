import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { checkAdmin } from "./requests/users";
export default function ProtectedComponent({ children }) {
  const [allow, setAllow] = useState(null);
  // const navigate = useNavigate
  useEffect(() => {
    async function foo() {
      const res = await checkAdmin();
      console.log("res is ", res);
      if (res) {
        setAllow(true);
      } else {
        setAllow(false);
      }
    }
    foo();
  }, []);
  console.log(allow);
  if (allow == null) {
    return <div>Loading...</div>;
  }
  if (!allow) {
    console.log("returning cild");
    console.log(children);
    return <Navigate to={"/"} replace />;
  }
  return <>{children}</>;
}
