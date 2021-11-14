import { useContext } from "react";
import { ContextApi } from "../contexts/ContextProvider.js";

const useContexts = () => {
  return useContext(ContextApi);
};

export default useContexts;
