import React, { createContext, useEffect, useState } from "react";

export const SessionContext = createContext({
  user: undefined,
  revalidateSession: async () => {},
});

function SessionProvider({ children }) {
  const [user, setUser] = useState(undefined);

  const revalidateSession = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/api/auth/session`,
        { credentials: "include" }
      );
      const session = await res.json();
      setUser(session.user);
      console.log(session.user);
    } catch (data) {
      return console.log(data);
    }
  };

  useEffect(() => {
    revalidateSession();
  }, []);

  return (
    <SessionContext.Provider
      value={{ user, revalidateSession: revalidateSession }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export default SessionProvider;
