import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthContext";


const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth, auth => auth?.auth ? "Logged In" : "Logged out");

  return useContext(AuthContext);
}

export default useAuth;
