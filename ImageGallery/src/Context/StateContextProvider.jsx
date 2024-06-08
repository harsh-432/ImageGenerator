import React, { useState } from "react";
import { createContext } from "react";
export const stateContext = createContext();

function StateContextProvider({ children }) {
  const [list, setList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [scroll, setScroll] = useState(true);
  return (
    <stateContext.Provider
      value={{
        list,
        setList,
        loading,
        setLoading,
        error,
        setError,
        pageNumber,
        setPageNumber,
        query,
        setQuery,
        setShow,
        show,
        data,
        setData,
        setScroll,
        scroll,
      }}
    >
      {children}
    </stateContext.Provider>
  );
}

export default StateContextProvider;
