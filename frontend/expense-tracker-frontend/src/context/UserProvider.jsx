import { useState,useEffect } from "react";
import UserContext from "./UserContext";

const UserProvider = ({ children }) => {
  // state management
  const [user, setUser] = useState(null);
  // Stores your user data (like name, email, or token).
  // initially it is null ... "no user logged in"

   // Load user from localStorage on first render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // restore user
    }
  }, []);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
     localStorage.setItem("user", JSON.stringify(userData));
  };

  // function to clear user data(e.g on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
