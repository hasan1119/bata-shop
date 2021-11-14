import React, { createContext } from "react";
import useFirebase from "../hooks/useFirebase.js";

export const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const authInfo = useFirebase();
  const data = {
    ...authInfo,
  };
  return <ContextApi.Provider value={data}>{children}</ContextApi.Provider>;
};

export default ContextProvider;
