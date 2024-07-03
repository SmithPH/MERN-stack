// ##### this context is to share global state
import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: localStorage.getItem("email"),
    posts: [],
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/*  to allow the state to use in other components (children) */}
      {/* we can put it in main.jsx to cover every component */}
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
