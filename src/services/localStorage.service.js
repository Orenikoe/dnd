
import { useState, createContext, useEffect } from "react";


const UserContext = createContext();
export default UserContext;

export function UserContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({token: null});

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
        setUserDetails({token: localStorage.getItem("token")})
    } else {setUserDetails({token: null})}
  }, []);


  return (
    <UserContext.Provider
      value={{
        userDetails,
        setUserDetails
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
