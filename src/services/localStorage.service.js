
import { useState, createContext, useEffect } from "react";


const UserContext = createContext();
export default UserContext;

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({token: localStorage.getItem("token") || null});
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks') || [])
);


  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}, [tasks]);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails,
        tasks, 
        setTasks
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
